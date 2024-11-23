// tests/integration/userRoutes.test.js

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/server');
const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');

describe('User Routes - Integration Tests', () => {
  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/users/register').send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('email', 'jane@example.com');
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      const user = new User({
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
      });
      await user.save();
    });

    it('should authenticate a user', async () => {
      const res = await request(app).post('/api/users/login').send({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  // Additional integration tests...
});
