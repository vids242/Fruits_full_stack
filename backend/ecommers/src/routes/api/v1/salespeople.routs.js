const express = require("express");
const { salespeopleController } = require("../../../controller");

const routes = express.Router();

routes.get(
    '/list-salespeople',
    salespeopleController.listsalespeople
)
module.exports = routes