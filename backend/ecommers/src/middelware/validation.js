const Joi = require("joi");
const { pick } = require("../../helper/pick");


const validation = (schema) => (req, res, next) => {
    // console.log(Object.keys(schema));


    try {
        const objs = pick(req, Object.keys(schema))

        console.log(objs);


        const { error, value } = Joi.compile(schema)
            .prefs({
                abortEarly: false
            })
            .validate(objs);

        // console.log(error.details);

        if (error) {
            const errMsg = error.details.map((v) => v.message).join(", ")

            return(next(new Error("validation error: "+ errMsg)))
            
        }
        Object.assign(req, value)
        console.log(value);
        next();

    } catch (error) {
        console.log(error);
    }
}

module.exports = validation