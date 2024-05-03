import ChatService from "../services/ChatService.js";

export default class ChatController {
    _service = new ChatService();

  saveMessage(data) {
        try{
            //Validate incoming data
            if (!data || !data.msgType || !data.message || !data.user) {
                console.log("Invalid data")
                return {code: -2, data: "Invalid data"}
            }

            //Actual timestamp
            data.timestamp = new Date().getTime()

            //Save message to storage
            const theCreatedMessage = this._service.saveMessageToStorage(data.user, data.message, data.timestamp)

            //After saving a message, i cleanup the typing messages of the user
            this._service.cleanTypingMessagesOfUser(data.user)

            return {code: 0, data: theCreatedMessage}
        }catch(e){
            console.log("Error at ChatController.saveMessage", e)
            return {code: -1, data: "Error saving message"}
        }
  }

  updateTypingMessageInStorage(data) {
    try {
        let affectedMessage = null

        //Actual timestamp
        data.timestamp = new Date().getTime()

        //If the user already has a typing message, update it
        if(this._service.getLastTypingMessageOfUser(data.user)){
            affectedMessage = this._service.updateTypingMessageInStorage(data.user, data.message, data.timestamp, "typing")
        }else{
            //If not, create a new typing message
            affectedMessage = this._service.saveMessageToStorage(data.user, data.message, data.timestamp, "typing")
        }

        return {code: 0, data: affectedMessage}
    }
    catch(e){
        console.log("Error at ChatController.updateTypingMessageInStorage", e)
        return {code: -1, data: "Error updating typing message"}
    }
  }

  getLastTypingMessageOfUser(user) {
    try {
        return {code: 0, data: this._service.getLastTypingMessageOfUser(user)}
    }
    catch(e){
        console.log("Error at ChatController.getLastTypingMessageOfUser", e)
        return {code: -1, data: "Error getting last typing message"}
    }
  }

    getMessages() {
        try {
            return {code: 0, data: this._service.getMessagesFromStorage()}
        }
        catch(e){
            console.log("Error at ChatController.getMessages", e)
            return {code: -1, data: "Error getting messages"}
        }
    }

    getLastMessage() {
        try {
            return {code: 0, data: this._service.getLastMessageFromStorage()}
        }
        catch (e) {
            console.log("Error at ChatController.getLastMessage", e)
            return { code: -1, data: "Error getting last message" }
        }
    }
}