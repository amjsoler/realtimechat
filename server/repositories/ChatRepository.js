export const chatRepository = []

export function saveMessageToStorage(user, message, timestamp) {
    chatRepository.push({
        id: getLastInsertedID()+1,
        user: user,
        message: message,
        timestamp: timestamp
    })
}

export function getLastInsertedID() {
    if(chatRepository.length === 0) return 0
    else return chatRepository[chatRepository.length - 1].id
}

export function getMessagesFromStorage() {
    return chatRepository
}

export function getLastMessageFromStorage() {
    if(chatRepository.length === 0) return null
    else return chatRepository[chatRepository.length - 1]
}