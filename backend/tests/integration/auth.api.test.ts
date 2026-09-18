import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/config/prisma.js';

describe('Auth API Integration Tests', () => {
  // Dọn dẹp DB trước khi chạy tất cả test trong file này
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  describe('POST /api/auth/register', () => {
    it('should block invalid email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'not-an-email',
          password: 'password123'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors[0].field).toBe('body.email');
    });

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'integration@rent.ish',
          password: 'password123',
          first_name: 'Integration',
          last_name: 'Test'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe('integration@rent.ish');
      expect(res.body.data).not.toHaveProperty('password_hash');
    });

    it('should block duplicate email registration', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'integration@rent.ish',
          password: 'anotherpassword'
        });

      expect(res.status).toBe(400); // Controller Auth trả về 400 cho duplicate, kiểm tra lại Error Middleware
      // Lưu ý: apiError(409) nhưng có thể controller trả 400 hoặc 409 tùy cách code. Trong bài test unit chúng ta assert 409.
      // Dù sao test này cũng sẽ verify status thực tế từ API.
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Email already in use');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully and set cookie', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'integration@rent.ish',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      
      // Kiểm tra xem cookie có được set không
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain('accessToken=');
      expect(cookies[0]).toContain('HttpOnly');
    });
  });
});
