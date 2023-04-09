const Joi=require("joi");
class Item {

    constructor(_id, title, completed) {
        this._id = _id;
        this.title = title;
        this.completed = completed;
    }

    validatePostOrPut() {
        const result = Joi.validate(this, Item.#postValidationSchema, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }

    validatePatch() {
        const result = Joi.validate(this, Item.#patchValidationSchema, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }



    static #postValidationSchema = {

        _id: Joi.optional(),

        title: Joi.string().required().min(3).max(50).error(errors => {
            for (const err of errors) {
                switch (err.type) {
                    case "any.required": err.message = "Missing title"
                        break;
                    case "any.empty": err.message = "title can't be an empty"
                        break;
                    case "string.min": err.message = "title must be minimum 3 chars"
                        break;
                    case "string.max": err.message = "title must be maximum 50 chars"
                        break;
                }
            }
            return errors;
        }),
        completed:Joi.number().min(0).max(1).required().error(errors => {
            for (const err of errors) {
                switch (err.type) {
                    case "any.required": err.message = "Missing completed"
                        break;
                }
            }
            return errors;
        })

    };


    static #patchValidationSchema = {

        _id: Joi.optional(),

        title: Joi.string().max(50).error(errors => {
            for (const err of errors) {
                switch (err.type) {
                    case "any.required": err.message = "Missing title"
                        break;
                    case "any.empty": err.message = "title can't be an empty"
                        break;
                    case "string.min": err.message = "title must be minimum 3 chars"
                        break;
                    case "string.max": err.message = "title must be maximum 50 chars"
                        break;
                }
            }
            return errors;
        }),
        completed: Joi.number().min(0).max(1).error(errors => {
            for (const err of errors) {
                switch (err.type) {
                    case "any.required": err.message = "Missing completed"
                        break;
                }
            }
            return errors;
        })

    };

}

module.exports = Item;