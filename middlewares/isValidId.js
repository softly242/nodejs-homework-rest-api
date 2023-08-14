const { isValidObjectId } = require('mongoose');

const {RequestError } = require("../helpers");

const isValidIdFunc = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
     RequestError(400, `${id} is not valid id`);
    }
    next();
}

module.exports = isValidIdFunc;