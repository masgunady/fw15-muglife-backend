const errorHandler = require("../helpers/errorHandler.helper")
const usersModel = require("../models/users.model")
const argon = require("argon2")

exports.updateChangePassword = async (request, response) => {
    try {
        const {id} = request.user
        const { oldPassword, newPassword, confirmNewPassword } = request.body
        const userData = await usersModel.findOneById(id)
        const passwordMatches = await argon.verify(userData.password, oldPassword)

        if (!passwordMatches) {
            return response.status(400).json({
                success: false,
                message: "Old password is incorrect."
            })
        }
        if (newPassword !== confirmNewPassword) {
            return response.status(400).json({
                success: false,
                message: "New password and confirm password do not match."
            })
        }
        const updatedUser = await usersModel.updateChangePassword(id, {
            newPassword: newPassword
        })
        return response.json({
            success: true,
            message: "Password updated successfully.",
            result: updatedUser
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}
