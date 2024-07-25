const express = require("express");
const { usersController } = require("../../../controller");


const routes = express.Router();


routes.post('/ragister',
    usersController.ragister
)


routes.post('/login',
    usersController.login
)

routes.post('/newtoken',
    usersController.generateNewTokens
)

module.exports = routes;