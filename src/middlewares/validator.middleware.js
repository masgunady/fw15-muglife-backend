const { body, validationResult} = require("express-validator")
// const {deleteImageFromCloudinary} = require("../middlewares/upload.middleware")
const updateFullName = body("fullName").optional().isLength({min:3, max:100}).withMessage("FullName length is invalid")
const updateAddress = body("address").optional().isLength({min:3, max:100}).withMessage("Address length is invalid")
const updateGender =  body("gender").optional().isBoolean({female: true, male: false}).withMessage("wrong gender")
const updateDate =  body("date").optional().isDate().withMessage("invalid date format")
const updatePhoneNumber =  body("phoneNumber").optional().isMobilePhone().withMessage("Invalid phone number")
const updateEmailFormat = body("email").optional().isEmail().withMessage("Email is invalid")
const updateUsername = body("username").optional().isLength({min:3, max:20}).withMessage("Username length is invalid")
const updateOrderedId = body("orderedId").optional().isInt().withMessage("OrderId harus berupa angka")

const rules = {
    updateProfile: [
        updateOrderedId,
        updateFullName,
        updateUsername,
        updateEmailFormat,
        updatePhoneNumber,
        updateGender,
        updateAddress,
        updateDate
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try {
        if (!errors.isEmpty()) {
            fileRemover(request.file)
            throw Error("validation")
        }
        return next()
    }catch(err) {
        return response.status(400).json({
            success: false,
            message: "Validation error",
            results: errors.array()
        })
        // return errorHandler(response, err)
    }
}

const validate = (selectedRules) => [rules[selectedRules], validator]

module.exports = validate
