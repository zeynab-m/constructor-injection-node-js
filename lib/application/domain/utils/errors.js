class AppError extends Error {

    constructor(code, httpStatus, message, language, data = {}, stack, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }


        message = message;
        this.stack = stack || this.stack;
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
        this.data = data;

    }

};
class InternalServerError extends AppError {
    constructor(err) {
        super(500, 500, err.message, undefined, undefined, err.stack);
    }
};

class PageNotFound extends AppError {
    constructor() {
        super(404, 404, "Page Not Found")
    }
}

class InputValidationError extends AppError {
    constructor(message) {
        super(-1, 400, message);
    }
}


class BadRequest extends AppError {
    constructor(message) {
        super(400, 400, message)
    }
}


class InvalidLoginCredential extends AppError {
    constructor(message) {
        super(401, 401, "Invalid Login Credential")
    }
}
class sessionAuthenticationError extends AppError {
    constructor(message) {
        super(401, 401, message)
    }
}


class userNotExist extends AppError {
    constructor() {
        super(403, 403, "user dose not exist")
    }
}

class itemInfoNotFound extends AppError {
    constructor(item) {
        super(403, 403, `${item+" info not found"}`)
    }
}
class itemBlocked extends AppError {
    constructor(item) {
        super(403, 403, `${item+" blocked"}`)
    }
}

class passwordValidation extends AppError {
    constructor() {
        super(403, 403, `password and repeated password are not the same`)
    }
}
class zoneIntersection extends AppError {
    constructor() {
        super(403, 403, `zone intersection`)
    }
}
class itemAlreadyExist extends AppError {
    constructor(item) {
        super(403, 403, `${item+"already exist"}`)
    }
}

module.exports = {
    AppError,
    InternalServerError,
    zoneIntersection,
    PageNotFound,
    BadRequest,
    InputValidationError,
    itemInfoNotFound,
    itemBlocked,
    sessionAuthenticationError,
    passwordValidation,
    itemAlreadyExist,
    userNotExist,
    InvalidLoginCredential

};
