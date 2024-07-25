const { Salespeople } = require("../models");

const listsalespeople = async (req, res) => {
    try {
        const salespeople = await Salespeople.getsalespeople()

        res.status(200).json({
            success: true,
            data: salespeople,
            message: "Salespeople Data Fetched"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const addsalespeople = async (req, res) => {
    try {
        const { sname, city, comm,isActive } = req.body

        const salespeople = await Salespeople.postsalespeople(sname, city, comm,isActive)
        console.log(salespeople);

        res.status(201).json({
            success: true,
            data: salespeople,
            message: "Salespeople Data Created"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const deletesalespeople = async (req, res) => {
    try {
        const { snum } = req.params
        console.log(snum);
        const salespeople = await Salespeople.deletesalespeople(snum)

        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data  deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })

    }
}

const updatesalespeople = async (req, res) => {
    try {
        const { snum } = req.params
        const { sname, city, comm,isActive } = req.body
        const salespeople = await Salespeople.updatesalespeople(snum, sname, city, comm,isActive)

        res.status(200).json({
            success: true,
            data: salespeople,
            message: "salespeople data  Updeted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: "Internal server error."
        })

    }
}


module.exports = {
    listsalespeople,
    addsalespeople,
    deletesalespeople,
    updatesalespeople
}