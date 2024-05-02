import {
    getLastInsertedID,
    getMessagesFromStorage,
    getLastMessageFromStorage,
    saveMessageToStorage,
    chatRepository
} from '../../repositories/ChatRepository'

beforeEach(() => {
    chatRepository.splice(0, chatRepository.length)
})

test('When  call the method getLastInsertedID and the chatRepository is empty, should return 0', () => {
    expect(getLastInsertedID()).toBe(0)
})

test('When call the method getMessagesFromStorage and the chatRepository is empty, should return an empty array', () => {
    expect(getMessagesFromStorage()).toEqual([])
})

test('When call the method getLastMessageFromStorage and the chatRepository is empty, should return undefined', () => {
    expect(getLastMessageFromStorage()).toBeNull()
})

test('When a new message is saved, the chatRepository should have one message', () => {
    expect(getLastInsertedID()).toBe(0)
    saveMessageToStorage("userTest", "the test message", 1111)
    expect(getLastInsertedID()).toBe(1)
})

test('After saving a message, the last message should be the one saved', () => {
    saveMessageToStorage("userTest", "the test message", 1111)
    expect(getLastMessageFromStorage().message).toBe("the test message")
})

test('After saving a message, the chatRepository should have one message', () => {
    saveMessageToStorage("userTest", "the test message", 1111)
    expect(getMessagesFromStorage().length).toBe(1)
})

test('After saving an other message, the chatRepository should have two message', () => {
    saveMessageToStorage("userTest", "the test message", 1111)
    saveMessageToStorage("userTest", "the test message", 1111)
    expect(getMessagesFromStorage().length).toBe(2)
})