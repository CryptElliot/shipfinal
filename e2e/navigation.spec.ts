import { test, expect } from '@playwright/test'

test('Test navigation between pages and sections on the landing page', async ({ page }) => {
  // Navigate to home page
  const url = process.env.VERCEL_URL ?? 'http://localhost:3000/' // TODO: add your app URL here
  console.log(`Running tests against ${url}`)
  await page.goto(url)

  // Expect home page heading to be visible
  await expect(page.getByText('This is a demo landing')).toBeVisible()
  await expect(page.getByText('page to build your SaaS')).toBeVisible()

  // Navigate to features section on home page
  await page.getByRole('link', { name: 'Learn more' }).first().click()

  // Expect features section to be visible
  await expect(page.locator('#features').getByRole('heading', { name: 'Features' })).toBeVisible()
  await expect(page.getByText('Everything you need to take your business to the next level')).toBeVisible()

  // Click the "Get started" button
  await page.getByRole('link', { name: 'Get started' }).first().click()

  // Expect the sign in page to be visible
  await expect(page).toHaveURL(/.*signin/)

  // Click the "Forgot your password?" link
  await page.getByRole('link', { name: 'Forgot your password?' }).click()

  // Expect the forgot password page to be visible
  await expect(page).toHaveURL(/.*forgot-password/)

  // Click the pricing link in the navigation bar
  await page.getByRole('link', { name: 'Pricing' }).click()

  // Expect the pricing page to be visible
  await expect(page).toHaveURL(/.*pricing/)

  // Click the blog link in the navigation bar
  await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click()

  // Expect the blog page to be visible
  await expect(page).toHaveURL(/.*blog/)
})
