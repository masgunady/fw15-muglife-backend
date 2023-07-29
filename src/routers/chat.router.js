const chatRouter = require("express").Router()
const chatController = require("../controllers/chat.controller")

chatRouter.get("/", chatController.getConversation)
chatRouter.get("/conversation", chatController.showConversation)
chatRouter.get("/admin", chatController.getAdmin)
chatRouter.post("/send", chatController.sendMessage)

module.exports = chatRouter
