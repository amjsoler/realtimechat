import {
    getLastInsertedID,
    getLastMessageFromStorage,
    getMessagesFromStorage,
    saveMessageToStorage,
    updateTypingMessageInStorage,
    getLastTypingMessageOfUser
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

    getLastTypingMessageOfUser(user) {
        return getLastTypingMessageOfUser(user)
    }

    updateTypingMessageInStorage(user, message, timestamp) {
        updateTypingMessageInStorage(user, message, timestamp, "typing")
    }
}