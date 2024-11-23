// tests/unit/controllers/userController.test.js

const userController = require('../../../src/controllers/userController');
const User = require('../../../src/models/User');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../../src/models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller - Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.create.mockResolvedValue({
        _id: 'userId',
        name: 'John Doe',
        email: 'john@example.com',
      });
      jwt.sign.mockReturnValue('token');

      await userController.registerUser(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual({
        message: 'User registered successfully',
        user: {
          id: 'userId',
          name: 'John Doe',
          email: 'john@example.com',
        },
        token: 'token',
      });
    });

    it('should return 400 if user already exists', async () => {
      req.body = {
        email: 'john@example.com',
      };

      User.findOne.mockResolvedValue({ email: 'john@example.com' });

      await userController.registerUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toContain('User already exists');
    });
  });

  // Additional tests for loginUser, getUserProfile, updateUserProfile...
});
