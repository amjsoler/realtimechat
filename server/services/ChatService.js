import {
    getLastInsertedID,
    getLastMessageFromStorage,
    getMessagesFromStorage,
    saveMessageToStorage
} from "../repositories/ChatRepository.js";

export default class ChatService {
    saveMessageToStorage(id, user, message, timestamp) {
        saveMessageToStorage(id, user, message, timestamp)
    }

    getLastInsertedID() {
        return getLastInsertedID()
    }

    getMessagesFromStorage() {
        return getMessagesFromStorage()
    }

    getLastMessageFromStorage() {
        return getLastMessageFromStorage()
    }
}