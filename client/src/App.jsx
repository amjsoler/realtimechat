import './App.css'
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket"

function App() {

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket("ws://localhost:8080", {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if(lastJsonMessage === null) return

        //Check the type of the msg
        switch (lastJsonMessage.msgType) {
            case "chatHistory":
                setMessages(lastJsonMessage.data)
                break
            case "lastMessage":
                setMessages([...messages, lastJsonMessage.data])
                break
        }

        scrollMsgBoardToBottom()

    }, [lastJsonMessage, messages])

    function scrollMsgBoardToBottom() {
        const msgBoard = document.querySelector("#msg-board")
        msgBoard.scrollTo(0, msgBoard.scrollHeight)
    }
    function handleSendMessage(event) {
        event.preventDefault()

        sendJsonMessage({ user: 'Jorge', msgType: 'message', message: newMessage })
    }

    const sinMessageBlock =
        <div className={"w-full pt-12"}>
            <p className={"text-center font-semibold text-2xl"}>Still no messages</p>
            <p className={"text-center text-xl"}>Send the first message with the input below </p>
        </div>
  return (
      <div className={"flex flex-col h-full space-y-4"}>
        <div id={"msg-board"} className={"grow border-2 border-stone-900/20 rounded-lg p-2 space-y-2 overflow-scroll"}>
            {
                (messages.length === 0) ?
                    sinMessageBlock :
                (messages.map((msg) => {
                    return (
                        <div key={msg.id} className="flex items-start gap-2.5">
                            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {msg.user}
                                    </span>
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                                </div>
                                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                    {msg.message}
                                </p>
                            </div>
                        </div>

                )
                }))
            }
        </div>

        <div>

          <form onSubmit={handleSendMessage}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input type="search" id="search"
                     onChange={(event) => {setNewMessage(event.target.value)}}
                     value={newMessage}
                     className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Type here your message" required/>
                <button type="submit"
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
        </div>
      </div>
  )
}

export default App
