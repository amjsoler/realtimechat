import ChatService from "../services/ChatService.js";

export default class ChatController {
    _service = new ChatService();
  async saveMessage(data) {
        //Validate incoming data
        if (!data || !data.msgType || !data.message || !data.user) {
            console.log("Invalid data")
            return
        }

      console.log("ChatController.saveMessage: ", data)

        this._service.saveMessageToStorage(data.id, data.user, data.message, data.timestamp)
  }


}