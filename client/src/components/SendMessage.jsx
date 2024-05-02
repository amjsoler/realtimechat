import {useState} from "react";


export function SendMessage({handleSendMessage, handleTypingMessage}) {

    const [newMessage, setNewMessage] = useState("")

    function handleTyping(event) {
        setNewMessage(event.target.value)
        handleTypingMessage(event.target.value)
    }
    function handleFormSubmit(event) {
        event.preventDefault()
        handleSendMessage(newMessage)
        setNewMessage("")
        document.querySelector("#newMessage").focus()
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="relative">
                <input type="text"
                       id="newMessage"
                       autoFocus={true}
                       onChange={handleTyping}
                       value={newMessage}
                       className="block w-full p-4 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-700 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="write your message here"
                       required/>
                <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor"
                         className="icon icon-tabler icons-tabler-outline icon-tabler-send-2">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z"/>
                        <path d="M6.5 12h14.5"/>
                    </svg>
                </button>
            </div>
        </form>
    )
}