import { test, expect } from '@playwright/test';
import { ApiHelpers } from '../../src/utils/api-helpers';
import { TestDataGenerator } from '../../src/utils/test-data-generator';

const API_URL = process.env.API_URL || 'https://api.realworld.show/api';

test.describe('Users API @api', () => {
  let api: ApiHelpers;

  test.beforeEach(async ({ request }) => {
    api = new ApiHelpers(request, API_URL);
  });

  test('POST /users - should register a new user', async () => {
    const user = TestDataGenerator.generateUser();
    const response = await api.createUser(user.username, user.email, user.password);
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe(user.email);
    expect(response.user.username).toBe(user.username);
    expect(response.user.token).toBeDefined();
  });

  test('POST /users/login - should login after registration', async () => {
    const user = TestDataGenerator.generateUser();
    await api.createUser(user.username, user.email, user.password);
    const response = await api.loginUser(user.email, user.password);
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe(user.email);
    expect(response.user.token).toBeDefined();
  });

  test('POST /users/login - should fail with invalid credentials', async () => {
    const response = await api.loginUser('nonexistent@test.com', 'wrongpassword');
    expect(response.user).toBeUndefined();
    expect(response.detail || response.errors).toBeDefined();
  });

  test('PUT /user - should update user profile', async () => {
    const user = TestDataGenerator.generateUser();
    const createResponse = await api.createUser(user.username, user.email, user.password);
    const token = createResponse.user.token;
    const updatedBio = 'Updated bio for testing';
    const response = await api.updateUser(token, { bio: updatedBio });
    expect(response.user.bio).toBe(updatedBio);
  });
});
