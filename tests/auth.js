const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const { User } = require("../models/index");
const ENV_VARS = require("../config/envVars");
const crypto = require('crypto');

let testUser;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a test user
  testUser = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123',
  });
});

afterAll(async () => {
  // Clean up database and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Auth API Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'Password123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'user successfully register');
    expect(response.body.user).toHaveProperty('_id');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'user successfully login');
    expect(response.body.data).toHaveProperty('_id');
  });

  it('should return 400 for invalid login credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should request password reset', async () => {
    const response = await request(app)
      .post('/api/v1/auth/password-reset')
      .send({
        email: 'test@example.com',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Password reset email sent');
  });

  it('should reset password', async () => {
    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Update the user with the reset token for testing
    await User.findByIdAndUpdate(testUser._id, {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    const response = await request(app)
      .post(`/api/v1/auth/password-reset/${resetToken}`)
      .send({
        password: 'NewPassword123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Password reset successful');
  });

  it('should logout a user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/logout');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logged out successfully');
  });

  it('should check authentication status', async () => {
    const response = await request(app)
      .get('/api/v1/auth/authCheck')
      .set('Authorization', `Bearer ${testUser._id}`); // Adjust to send a valid token

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
  });

  it('should return 400 for invalid reset token', async () => {
    const response = await request(app)
      .post(`/api/v1/auth/password-reset/invalidtoken`)
      .send({
        password: 'SomePassword123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid or expired token');
  });
});