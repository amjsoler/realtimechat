import {
    getLastInsertedID,
    getLastMessageFromStorage,
    getMessagesFromStorage,
    saveMessageToStorage
} from "../repositories/ChatRepository.js";

export default class ChatService {
    saveMessageToStorage(user, message, timestamp) {
        saveMessageToStorage(user, message, timestamp)
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