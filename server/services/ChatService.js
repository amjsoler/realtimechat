import {getLastInsertedID, saveMessageToStorage} from "../repositories/ChatRepository.js";

export default class ChatService {
    getMessagesFromStorage() {
        return [];
    }

    saveMessageToStorage(id, user, message, timestamp) {
        saveMessageToStorage(id, user, message, timestamp)
    }

    getLastInsertedID() {
        return getLastInsertedID()
    }
}