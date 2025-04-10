import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userService from './userService';
import { ServiceError } from './serviceErrorMessages';
import { url } from '../api/url';
import * as request from '../api/request';

vi.mock('../api/request', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  remove: vi.fn(),
}));

describe('userService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getAllUsers returns an array of users from response object values', async () => {
    const response = { u1: { id: 'u1' }, u2: { id: 'u2' } };
    request.get.mockResolvedValue(response);
    const users = await userService.getAllUsers();
    expect(request.get).toHaveBeenCalledWith(url.users);
    expect(users).toEqual(Object.values(response));
  });

  it('getUsersWithLowerRole filters users with role lower than currentUserRole', async () => {
    const usersArray = [
      { id: '1', role: 2 },
      { id: '2', role: 5 },
      { id: '3', role: 1 },
    ];
    request.get.mockResolvedValue({ u1: usersArray[0], u2: usersArray[1], u3: usersArray[2] });
    const filtered = await userService.getUsersWithLowerRole(3);
    expect(filtered).toEqual([{ id: '1', role: 2 }, { id: '3', role: 1 }]);
  });

  it('findUserById calls request.get with the correct URL and returns the response', async () => {
    const id = 'u1';
    const response = { id, username: 'test' };
    request.get.mockResolvedValue(response);
    const result = await userService.findUserById(id);
    expect(request.get).toHaveBeenCalledWith(`${url.users}/${id}`);
    expect(result).toEqual(response);
  });

  it('findUserByEmail calls request.get with the correct URL and returns the response', async () => {
    const email = 'test@example.com';
    const response = { email, id: 'u1' };
    request.get.mockResolvedValue(response);
    const result = await userService.findUserByEmail(email);
    expect(request.get).toHaveBeenCalledWith(`${url.userByEmail}/${email}`);
    expect(result).toEqual(response);
  });

  it('findUserByUsername calls request.get with the correct URL and returns the response', async () => {
    const username = 'test';
    const response = { username, id: 'u1' };
    request.get.mockResolvedValue(response);
    const result = await userService.findUserByUsername(username);
    expect(request.get).toHaveBeenCalledWith(`${url.userByUsername}/${username}`);
    expect(result).toEqual(response);
  });

  it('deleteUser returns error if no userId is provided', async () => {
    const result = await userService.deleteUser(null);
    expect(result).toEqual({ error: ServiceError.USER_ID_REQUIRED });
  });

  it('deleteUser calls request.remove when a valid userId is provided', async () => {
    const userId = 'u1';
    const response = { success: true };
    request.remove.mockResolvedValue(response);
    const result = await userService.deleteUser(userId);
    expect(request.remove).toHaveBeenCalledWith(`${url.deleteUser}/${userId}`);
    expect(result).toEqual(response);
  });

  it('registerAuthUser calls request.post with the correct payload and returns the response', async () => {
    const payload = { email: 'test@example.com', username: 'testuser', password: 'pass' };
    const response = { id: 'u1' };
    request.post.mockResolvedValue(response);
    const result = await userService.registerAuthUser(payload.email, payload.username, payload.password);
    expect(request.post).toHaveBeenCalledWith(url.register, payload);
    expect(result).toEqual(response);
  });

  it('editUser returns error if id is missing', async () => {
    const result = await userService.editUser(null, { username: 'new' });
    expect(result).toEqual({ error: ServiceError.USER_ID_REQUIRED });
  });

  it('editUser calls request.put with the correct URL and data when valid', async () => {
    const id = 'u1';
    const data = { username: 'newuser' };
    const response = { success: true };
    request.put.mockResolvedValue(response);
    const result = await userService.editUser(id, data);
    expect(request.put).toHaveBeenCalledWith(`${url.editUser}/${id}`, data);
    expect(result).toEqual(response);
  });

  it('validateNewUser calls request.post and then uses setValidationErrors if username/email exist', async () => {
    const setValidationErrors = vi.fn();
    const username = 'exists';
    const email = 'exists@example.com';
    const responseObject = { usernameExists: true, emailExists: true };
    request.post.mockResolvedValue(responseObject);
    await userService.validateNewUser(username, email, setValidationErrors);
    expect(setValidationErrors).toHaveBeenCalled();
  });
});
