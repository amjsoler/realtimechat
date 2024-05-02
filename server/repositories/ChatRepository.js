export const chatRepository = []

export function saveMessageToStorage(id, user, message, timestamp) {

    chatRepository.push({
        id: id,
        user: user,
        message: message,
        timestamp: timestamp
    })
}

export function getLastInsertedID() {
    if(chatRepository.length === 0) return 0
    else return chatRepository[chatRepository.length - 1].id
}