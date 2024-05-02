export let chatRepository = []

export function saveMessageToStorage(user, message, timestamp, msgType="message") {
    chatRepository.push({
        id: getLastInsertedID()+1,
        user: user,
        message: message,
        msgType: msgType,
        timestamp: timestamp
    })
}

export function updateTypingMessageInStorage(user, message, timestamp, msgType="typing") {
    const indexTypingMessage = chatRepository.indexOf(chatRepository.filter(item => item.user === user && item.msgType === "typing")[0])

    if(indexTypingMessage !== -1) {
        chatRepository[indexTypingMessage] = {
            id: chatRepository[indexTypingMessage].id,
            user: user,
            message: message,
            msgType: msgType,
            timestamp: timestamp
        }
    }
}

export function cleanTypingMessagesOfUser(user) {
    chatRepository = chatRepository.filter(item => item.user !== user || item.msgType !== "typing")
}

export function getLastTypingMessageOfUser(user) {
    if(chatRepository.filter(item => item.user === user && item.msgType === "typing").length === 0){
        return null
    }
    else {
        return chatRepository.filter(item => item.user === user && item.msgType === "typing")[0]
    }
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