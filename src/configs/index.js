const dotenv = require('dotenv');

const envFound = dotenv.config();

if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    databaseURL: process.env.MONGO_URI,
    passwordSec: process.env.PASS_SEC,
    jwtSec: process.env.JWT_SEC,
    vAPI: process.env.VERSION_API
}