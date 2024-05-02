import {
    getLastInsertedID,
    getLastMessageFromStorage,
    getMessagesFromStorage,
    saveMessageToStorage,
    updateTypingMessageInStorage,
    getLastTypingMessageOfUser,
    cleanTypingMessagesOfUser
} from "../repositories/ChatRepository.js";

export default class ChatService {
    saveMessageToStorage(user, message, timestamp, msgType) {
        saveMessageToStorage(user, message, timestamp, msgType)
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

    cleanTypingMessagesOfUser(user) {
        cleanTypingMessagesOfUser(user)
    }
}