import { describe, it, expect, vi } from 'vitest'
import supertest from 'supertest'

// Mock nodemailer so no real emails are sent during tests
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'mock-message-id' }),
    })),
  },
}))

const { app } = await import('../index.js')
const request = supertest(app)

// ─── Health Check ──────────────────────────────────────────────────────────────

describe('GET /api/health', () => {
  it('returns 200 with server status', async () => {
    const res = await request.get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('Server is running!')
  })
})

// ─── Contact Form Validation ───────────────────────────────────────────────────

describe('POST /api/contact — validation', () => {
  it('returns 400 when all fields are missing', async () => {
    const res = await request.post('/api/contact').send({})
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe('All fields are required')
  })

  it('returns 400 when name is missing', async () => {
    const res = await request.post('/api/contact').send({
      email: 'test@example.com',
      message: 'Hello there',
    })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('returns 400 when email is missing', async () => {
    const res = await request.post('/api/contact').send({
      name: 'Test User',
      message: 'Hello there',
    })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('returns 400 when message is missing', async () => {
    const res = await request.post('/api/contact').send({
      name: 'Test User',
      email: 'test@example.com',
    })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })

  it('returns 400 for invalid email format', async () => {
    const res = await request.post('/api/contact').send({
      name: 'Test User',
      email: 'not-an-email',
      message: 'Hello there',
    })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe('Invalid email format')
  })

  it('returns 400 for email missing domain', async () => {
    const res = await request.post('/api/contact').send({
      name: 'Test User',
      email: 'test@',
      message: 'Hello there',
    })
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })
})

// ─── Contact Form Success ──────────────────────────────────────────────────────

describe('POST /api/contact — success', () => {
  it('returns 200 with valid data (email is mocked)', async () => {
    const res = await request.post('/api/contact').send({
      name: 'Savanth Pamu',
      email: 'savanth@example.com',
      message: 'This is a test message from the test suite.',
    })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe('Message sent successfully!')
  })
})
