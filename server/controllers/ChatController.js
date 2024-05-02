import ChatService from "../services/ChatService.js";

export default class ChatController {
    _service = new ChatService();
  async saveMessage(data) {
        //Validate incoming data
        if (!data || !data.msgType || !data.message || !data.user) {
            console.log("Invalid data")
            return false
        }

        //Consultar el último ID insertado
        data.id = parseInt(this._service.getLastInsertedID()) + 1
console.log(data.id)
        //Actual timestamp
        data.timestamp = new Date().getTime()

        //Save message to storage
        this._service.saveMessageToStorage(data.id, data.user, data.message, data.timestamp)

      return true
  }


}