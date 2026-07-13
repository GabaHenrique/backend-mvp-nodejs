const adminService = require('../../src/services/adminService');

jest.mock('../../src/models/adminModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const adminModel = require('../../src/models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

beforeEach(() => {
  jest.clearAllMocks();
});

test("login com credenciais corretas retorna um token", async () => {

  adminModel.findByEmail.mockResolvedValue({
    id: 1,
    email: "admin@rua.com",
    password: "hash_falso",
    role: "admin"
  });

  bcrypt.compare.mockResolvedValue(true);
  jwt.sign.mockReturnValue("token_falso_123");

  const token = await adminService.login("admin@rua.com", "123456");

  expect(token).toBe("token_falso_123");
  expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hash_falso");

});

test("login com email inexistente lança Credenciais inválidas", async () => {

  adminModel.findByEmail.mockResolvedValue(undefined);

  await expect(
    adminService.login("naoexiste@rua.com", "123456")
  ).rejects.toThrow("Credenciais inválidas");

  expect(bcrypt.compare).not.toHaveBeenCalled();

});

test("login com senha errada lança Credenciais inválidas", async () => {

  adminModel.findByEmail.mockResolvedValue({
    id: 1,
    email: "admin@rua.com",
    password: "hash_falso",
    role: "admin"
  });

  bcrypt.compare.mockResolvedValue(false);

  await expect(
    adminService.login("admin@rua.com", "senhaErrada")
  ).rejects.toThrow("Credenciais inválidas");

  expect(jwt.sign).not.toHaveBeenCalled();

});
