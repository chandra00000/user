function validateRequest(req, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        var o = {} // define empty Object
        var key = 'validation_errors';
        o[key] = [];
       o[key].push(error.details.map(x => x.message).join(', '));
       return o;
    } else {
        return req.body = value;
    }
}

module.exports = {
    validateRequest
}