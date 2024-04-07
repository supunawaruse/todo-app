const HttpStatusCode = Object.freeze({
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
});

const ResponseMessage = Object.freeze({
    SUCCESS: 'Success',
    SOMETHING_WENT_WRONG: 'Something went wrong',
});

// General response without a payload
exports.generalResponse = function(res, message = ResponseMessage.SUCCESS, status = HttpStatusCode.OK) {
    res.status(status).json({
        status: status,
        msg: message
    });
};

exports.generalErrorResponse = function(res, message) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
        status: HttpStatusCode.BAD_REQUEST,
        msg: message
    });
};

exports.generalErrorPayloadResponse = function(res, err, message) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
        status: HttpStatusCode.BAD_REQUEST,
        msg: message || err.message || ResponseMessage.SOMETHING_WENT_WRONG,
        error: err
    });
};


// General response with a payload
exports.generalPayloadResponse = function(res, payload, message = ResponseMessage.SUCCESS, status = HttpStatusCode.OK) {
    res.status(status).json({
        status: status,
        msg: message,
        data: payload
    });
};