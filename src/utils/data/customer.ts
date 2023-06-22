import { stripe } from '../stripe'
import { supabaseAdmin } from '../supabase-admin-client'

export const getOrCreateCustomer = async (uuid: string, email: string): Promise<string | null> => {
  const { data, error: selectError } = await supabaseAdmin
    .from('stripe_customers')
    .select('stripe_customer_id')
    .eq('user_id', uuid)
    .single()

  if (selectError) {
    const customerData = {
      email: email,
      metadata: {
        supabaseUUID: uuid
      }
    }

    const customer = await stripe.customers.create(customerData)
    const { error: insertError } = await supabaseAdmin
      .from('stripe_customers')
      .insert([{
        user_id: uuid,
        stripe_customer_id: customer.id
      }])

    if (insertError) {
      console.error(insertError)
      return null
    }

    return customer.id
  }

  return data?.stripe_customer_id
}

export const deleteCustomer = async (stripeCustomerId: string) => {
  const { data, error: selectError } = await supabaseAdmin
    .from('stripe_customers')
    .select('user_id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single()

  if (selectError) {
    console.warn(`Customer with ID '${stripeCustomerId}' does not exist. Error: ${selectError.message}`)
    return
  }

  const { error: deleteSubscriptionError } = await supabaseAdmin
    .from('subscriptions')
    .delete()
    .match({ user_id: data.user_id })

  if (deleteSubscriptionError) {
    console.warn(`Could not delete subscription for customer with ID '${stripeCustomerId}'. Error: ${deleteSubscriptionError.message}`)
    return
  }

  const { error: deleteCustomerError } = await supabaseAdmin
    .from('stripe_customers')
    .delete()
    .match({ 'stripe_customer_id': stripeCustomerId })

  if (deleteCustomerError) {
    console.warn(`Could not delete customer with ID '${stripeCustomerId}'. Error: ${deleteCustomerError.message}`)
  } else {
    console.log(`Customer with ID '${stripeCustomerId}' deleted successfully.`)
  }
}
