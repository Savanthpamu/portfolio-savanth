import { test, expect } from '@playwright/test'

// ─── Page Load ─────────────────────────────────────────────────────────────────

test('portfolio homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Savanth|Portfolio/i)
})

test('contact section is visible on page', async ({ page }) => {
  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(page.locator('#contact')).toBeVisible()
})

// ─── Contact Form Rendering ────────────────────────────────────────────────────

test('contact form fields render correctly', async ({ page }) => {
  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()

  await expect(page.locator('input[name="name"]')).toBeVisible()
  await expect(page.locator('input[name="email"]')).toBeVisible()
  await expect(page.locator('textarea[name="message"]')).toBeVisible()
  await expect(page.locator('button[type="submit"]')).toBeVisible()
  await expect(page.locator('button[type="submit"]')).toHaveText('Send Message')
})

// ─── Contact Form Submission ───────────────────────────────────────────────────

test('form shows Sending... state on submit', async ({ page }) => {
  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()

  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'This is a test message from Playwright E2E.')

  await page.click('button[type="submit"]')

  await expect(page.locator('button[type="submit"]')).toHaveText('Sending...', { timeout: 3000 })
})

test('form shows success or error message after submit', async ({ page }) => {
  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()

  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'This is a test message from Playwright E2E.')

  await page.click('button[type="submit"]')

  // Wait for either success or error message (backend may or may not be configured)
  const success = page.locator('text=Message sent successfully')
  const error = page.locator('text=Failed to send message')

  await expect(success.or(error)).toBeVisible({ timeout: 15000 })
})
