class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundError extends AppError {
    constructor (message = 'Recurso não encontrado') {
        super (message, 404);
    }
}

class ConflictError extends AppError {
    constructor(message = 'Conflito de dados') {
        super(message,409);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Dados Inválidos') {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Não Autorizado') {
        super (message, 401);
    }
}

module.exports = { AppError, NotFoundError, ConflictError, ValidationError, UnauthorizedError};