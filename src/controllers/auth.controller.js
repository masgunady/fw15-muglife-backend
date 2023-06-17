const userModel = require("../models/users.model")
const profileModel = require("../models/profile.model")
const forgotRequestModel = require("../models/forgotRequest.model")
const errorHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const { APP_SECRET } = process.env
const argon = require("argon2")

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOneByEmail(email)
        if (!user) {
            throw Error("wrong_email")
        }
        const verify = await argon.verify(user.password, password)
        if (!verify) {
            throw Error("wrong_password")
        }
        const token = jwt.sign({ id: user.id, role: user.role }, APP_SECRET)
        return res.json({
            success: true,
            message: "Login success!",
            results: { token },
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.register = async (request, response) => {
    try {
        const role = 2
        const {email, password, phoneNumber} = request.body
        if(email === "") {
            throw Error("blank_email")
        }
        if(password === "") {
            throw Error("blank_password")
        }
        if(phoneNumber === "") {
            throw Error("blank_phoneNumber")
        }
        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash,
            roleId: role
        }
        const user = await userModel.insert(data)
        console.log("test")
        const profileData = {
            userId: user.id
        }
        console.log(profileData)
        await profileModel.insert(profileData)
        const token = jwt.sign({id: user.id}, APP_SECRET)
        console.log(token)
        return response.json({
            success: true,
            message: "Register success!",
            results: {token}
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

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
