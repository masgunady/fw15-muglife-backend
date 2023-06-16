const userModel = require("../models/users.model")
const profileModel = require("../models/profile.model")
const forgotRequestModel = require("../models/forgotRequest.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const { APP_SECRET } = process.env
const argon = require("argon2")

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOneByEmail(email)
        if (!user) {
            throw Error("wrong_email")
        }
        const forgot = await forgotRequestModel.insert({
            email: user.email
        })
        if (!forgot) {
            throw Error("forgot_failed")
        }
        return res.json({
            success: true,
            message: "Forgot password success!",
            results: user
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body
        const selectedUser = await userModel.findOneByEmail(email)
        const data = {
            password: await argon.hash(newPassword, confirmPassword)
        }
        if(newPassword !== confirmPassword){
            throw Error("password_unmatch")
        }
        const user = await userModel.update(selectedUser.email, data)
        if (!user) {
            throw Error("no_forgot_request")
        }
        const selectedForgotRequest = await forgotRequestModel.findOneByEmail(selectedUser)
        await forgotRequestModel.destroy(selectedForgotRequest.id)
        return res.json({
            success: true,
            message: "Reset password success!",
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}
