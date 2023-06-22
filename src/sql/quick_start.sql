-- Table that contains more user details
create table user_details (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  billing_address jsonb,
  payment_method jsonb
  -- expand this table with more user details
);

alter table user_details enable row level security;
create policy "User can view their own data." on user_details for select using (auth.uid() = id);
create policy "User can update their own data." on user_details for update using (auth.uid() = id);

-- Trigger to automatically create a new user details entry when a new user signs up
create function public.handle_new_signup() 
returns trigger as $$
begin
  insert into public.user_details (id, full_name, avatar_url)
  values
  (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;

$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_signup();

-- Table that contains a mapping of user ID to Stripe customer ID
create table stripe_customers (
  user_id uuid references auth.users not null primary key,
  stripe_customer_id text
);

alter table stripe_customers enable row level security;

-- Table that contains Stripe product data - synced to the DB via Stripe webhooks
create table products (
  -- Product ID from Stripe
  id text primary key,
  active boolean,
  name text,
  description text,
  -- Product image URl in Stripe
  image text,
  -- Set of key-value pairs to store additional information
  metadata jsonb
);

alter table products enable row level security;
create policy "Anyone can view products" on products for select using (true);

-- Table that contains Stripe product pricing data - synced to the DB via Stripe webhooks
create type pricing_type as enum ('one_time', 'recurring');
create type pricing_plan_interval as enum ('month', 'year');
create table prices (
  id text primary key,
  product_id text references products, 
  active boolean,
  description text,
  -- The unit amount as a positive integer in the smallest currency unit
  unit_amount bigint,
  -- Three-letter ISO currency code in lowercase
  currency text check (char_length(currency) = 3),
  type pricing_type,
  interval pricing_plan_interval,
  -- The number of intervals between subscription billings. 
  -- E.g. `interval=month` and `interval_count=3` is billed every 3 months.
  interval_count integer,
  -- Number of trial days when subscribing a customer to this price 
  -- using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trial_period_days integer,
  -- Set of key-value pairs to store additional information
  metadata jsonb
);

alter table prices enable row level security;
create policy "Anyone can view prices" on prices for select using (true);

-- Table that contains Stripe subscription data - synced to the DB via Stripe webhooks
create type subscription_status as enum 
(
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid'
);

create table subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status subscription_status,
  price_id text references prices,
  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription.
  -- Can be used to charge multiple seats.
  quantity integer,
  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancel_at_period_end boolean,

  -- Time at which the subscription was created.
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Start of the current period that the subscription has been invoiced for.
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  -- If the subscription has ended, the timestamp of the date the subscription ended.
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  -- A date in the future at which the subscription will automatically get canceled.
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has been canceled, the date of that cancellation.
  -- If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request,
  -- not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  -- Set of key-value pairs to store additional information
  metadata jsonb,

  -- If the subscription has a trial - trail start date
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  -- If the subscription has a trial - trail end date
  trial_end timestamp with time zone default timezone('utc'::text, now())
);

alter table subscriptions enable row level security;
create policy "User can view their own data." on subscriptions for select using (auth.uid() = user_id);

-- Create storage bucket
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

-- Create bucket policies
create policy "Anyone can view all avatar images"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "User can upload their own avatar"
  on storage.objects for insert
  with check ( 
    bucket_id = 'avatars'
    and auth.uid() = owner
  );

create policy "User can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid() = owner
  );
  