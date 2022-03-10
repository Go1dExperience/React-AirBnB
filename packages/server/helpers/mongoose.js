module.exports = {
    /////////////////////////////////////////////////////////////////////////////////////////
    // MONGOOSE ERROR
    /////////////////////////////////////////////////////////////////////////////////////////
    normalizeErrors: function (errors) {
        let normalizeErrors = [];
        for (let property in errors) {
            if (errors.hasOwnProperty(property)) {
                normalizeErrors.push({
                    title: property,
                    detail: errors[property].message,
                });
            }
        }
        return normalizeErrors;
    },
    /////////////////////////////////////////////////////////////////////////////////////////
    // VALIDATION ERROR
    /////////////////////////////////////////////////////////////////////////////////////////
    validateErrors: function (errors) {
        let validateErrors = [];
        for (let error in errors) {
            validateErrors.push({
                location: errors[error].param,
                detail: errors[error].msg,
            });
        }
        return validateErrors;
    },
};
