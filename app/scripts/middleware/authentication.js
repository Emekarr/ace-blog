const jwt = require("jsonwebtoken")

const authmiddleware = (req, res, next) => {
    const cookies = req.cookies
    console.log(cookies)
}

module.exports = authmiddleware
