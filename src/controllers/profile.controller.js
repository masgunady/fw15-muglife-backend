const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../../helpers/fileRemover.helper")
const profileModel = require("../models/profile.model")
const userModel = require("../models/users.model")
// const {deleteImageFromCloudinary} = require("../middlewares/upload.middleware")

exports.updateProfile = async (request, response) => {
    try {
        const {id} = request.user
        const user = await profileModel.findOneByUserId(id)
        const data = {
            ...request.body
        }
        console.log(data)
        if(!user) {
            throw Error("unauthorized")
        }
        if(request.file) {
            // if(user.picture) {
            //     const cloudinaryFolder = "Cup of Five"
            //     const picture = user.picture.substring(user.picture.lastIndexOf("/") + 1, user.picture.lastIndexOf("."))
            //     const data = cloudinaryFolder.concat("/", picture)
            //     deleteImageFromCloudinary(data)
            // }
            data.picture = request.file.path
            // data.picture = request.file.filename
        }
        console.log("tes")
        const profile = await profileModel.updateByUserId(id, data)
        console.log(profile)
        if(!profile) {
            throw Error("update_profile_failed")
        }
        let updatedUser
        if(data.email) {
            updatedUser = await userModel.update(id, data)
        }else {
            updatedUser = await userModel.findOneById(id)
        }
        if(data.phoneNumber) {
            updatedUser = await userModel.update(id, data)
        }else {
            updatedUser = await userModel.findOneById(id)
        }
        const results = {
            orderedId: profile.orderedId,
            picture: profile.picture,
            fullName: profile.fullName,
            username: profile.username,
            email: updatedUser?.email,
            phoneNumber: updatedUser?.phoneNumber,
            gender: profile.gender,
            address: profile.address,
            birthDate: profile.birthDate
        }
        return response.json({
            success: true,
            message: "Profile updated",
            results
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}

exports.getProfile = async (request, response) => {
    try {
        const {id} = request.user
        const profile = await profileModel.findOneByUserId(id)
        if(!profile) {
            throw Error("unauthorized")
        }
        return response.json({
            success: true,
            message: "Profile",
            results: profile
        })
    }catch(err) {
        return errorHandler(response, err)
    }
}


