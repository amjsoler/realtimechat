import ChatService from "../services/ChatService.js";

export default class ChatController {
    _service = new ChatService();

  async saveMessage(data) {
        try{
            //Validate incoming data
            if (!data || !data.msgType || !data.message || !data.user) {
                console.log("Invalid data")
                return false
            }

            //Actual timestamp
            data.timestamp = new Date().getTime()

            //Save message to storage
            this._service.saveMessageToStorage(data.user, data.message, data.timestamp)

            return {code: 0, data: "Message saved successfully"}
        }catch(e){
            console.log("Error at ChatController.saveMessage", e)
            return {code: -1, data: "Error saving message"}
        }
  }

    async getMessages() {
        try {
            return {code: 0, data: this._service.getMessagesFromStorage()}
        }
        catch(e){
            console.log("Error at ChatController.getMessages", e)
            return {code: -1, data: "Error getting messages"}
        }
    }

    async getLastMessage() {
        try {
            return {code: 0, data: this._service.getLastMessageFromStorage()}
        }
        catch (e) {
            console.log("Error at ChatController.getLastMessage", e)
            return { code: -1, data: "Error getting last message" }
        }
    }
}