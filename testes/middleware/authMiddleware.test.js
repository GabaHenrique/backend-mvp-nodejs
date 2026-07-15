const authMiddleware = require('../../src/middlewares/authMiddleware');

jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

beforeEach(() => {
  jest.clearAllMocks();
});

function criarReqFalso(headers = {}) {
  return { headers };
}

function criarResFalso() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

test("bloqueia requisição sem header de autorização", () => {

  const req = criarReqFalso({});
  const res = criarResFalso();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
  expect(next).not.toHaveBeenCalled();

});

test("bloqueia requisição com token inválido", () => {

  jwt.verify.mockImplementation(() => {
    throw new Error("jwt malformed");
  });

  const req = criarReqFalso({ authorization: "Bearer token_invalido" });
  const res = criarResFalso();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
  expect(next).not.toHaveBeenCalled();

});

test("libera acesso com token válido e preenche req.admin", () => {

  jwt.verify.mockReturnValue({ id: 1, role: "admin" });

  const req = criarReqFalso({ authorization: "Bearer token_valido" });
  const res = criarResFalso();
  const next = jest.fn();

  authMiddleware(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(req.admin).toEqual({ id: 1, role: "admin" });
  expect(res.status).not.toHaveBeenCalled();

});