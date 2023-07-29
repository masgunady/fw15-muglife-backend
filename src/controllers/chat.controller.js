const errorHandler = require("../helpers/errorHandler.helper")
const chatModel = require("../models/chat.model")
const profileModel =  require("../models/profile.model")

exports.getConversation =  async(request, response) => {
    try {
        const {id} =  request.user
        const conversation = await chatModel.findListConversation(id)
        return response.json({
            success: true,
            message: "all chats",
            results: conversation,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
exports.getAdmin =  async(request, response) => {
    try {
        const roleId = 1
        const dataAdmin = await profileModel.findByRoleId(roleId)
        return response.json({
            success: true,
            message: "all chats",
            results: dataAdmin,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.showConversation = async(request, response) => {
    try {
        const {conversation_id} = request.query
        const showConversation = await chatModel.showConversation(conversation_id)
        return response.json({
            success: true,
            message: "all conversations",
            results: showConversation,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.sendMessage =  async(request, response) => {
    try {
        const {id} = request.user
        const user_id = id
        const dataConversation = {...request.body, user_id}
        // return console.log(dataConversation)
        const checkConversation = await chatModel.checkConversation(dataConversation)
        if(!checkConversation){
            const createConversation =  await chatModel.insertConversation(dataConversation)
            const conversation_id = createConversation.id
            const dataFirst = {...request.body, conversation_id, user_id}
            const sendMessage = await chatModel.insertMessage(dataFirst)
            return response.json({
                success: true,
                message: "message has been sent",
                results: sendMessage,
            })
        }
        
        if(dataConversation.conversation_id === "new"){
            const dataConversationInsert = {...dataConversation, conversation_id:checkConversation.id}
            const sendMessage = await chatModel.insertMessage(dataConversationInsert)
            return response.json({
                success: true,
                message: "message has been sent",
                results: sendMessage,
            })
        }

        const sendMessage = await chatModel.insertMessage(dataConversation)
        return response.json({
            success: true,
            message: "message has been sent",
            results: sendMessage,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
