const { getsalespeople } = require("../models/salespeople.models");

const listsalespeople = () => {
    try {
        console.log("jwsx");
        const salespeople = getsalespeople()
        console.log(salespeople);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listsalespeople
}