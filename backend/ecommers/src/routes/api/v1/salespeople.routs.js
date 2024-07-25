const express = require("express");
const { salespeopleController } = require("../../../controller");

const routes = express.Router();

routes.get(
    '/list-salespeople',
    salespeopleController.listsalespeople
)
routes.post(
    '/add-salespeople',
    salespeopleController.addsalespeople
)
routes.delete(
    '/delete-salespeople/:snum',
    salespeopleController.deletesalespeople
)

routes.put(
    '/update-salespeople/:snum',
    salespeopleController.updatesalespeople
)


module.exports = routes