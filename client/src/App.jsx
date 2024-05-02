import './App.css'
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket"
import {SendMessage} from "./components/SendMessage.jsx";
import {MessageBoard} from "./components/MessageBoard.jsx";
import {LoginUser} from "./components/LoginUser.jsx";
import {ThemeToggle} from "./components/ThemeToggle.jsx";

function App() {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)

    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket("ws://localhost:8080", {
        onOpen: () => {},
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: () => true,
    });

    useEffect(() => {
        scrollMsgBoardToBottom()
    }, [messages]);

    function handlerTypingPartialMessage(message) {
        //Search in message array if message id exists
        if(messages.filter(item => item.id === message.id).length === 0) {
            //If not exists, add the message
            setMessages([...messages, message])
        }else{
            //If exists, update the message
            const messageIndex = messages.findIndex(item => item.id === message.id)

            console.log("Message index: ", messageIndex)
            //Update the message
            let newMessages = [...messages]
            newMessages[messageIndex] = message

            setMessages(newMessages)
        }
    }
    useEffect(() => {
        if(lastJsonMessage === null) return

        //Check the type of the msg
        switch (lastJsonMessage.msgType) {
            case "chatHistory":
                setMessages(lastJsonMessage.data)
                break
            case "lastMessage":
                //if the user has typing message, remove it
                if(messages.filter(item => item.user === lastJsonMessage.data.user && item.msgType === 'typing')){
                    const newMessages = messages.filter(item => item.user !== lastJsonMessage.data.user || item.msgType !== 'typing')
                    setMessages(newMessages)
                }

                setMessages([...messages, lastJsonMessage.data])
                break
            case "typing":
                handlerTypingPartialMessage(lastJsonMessage.data)
                break
        }
    }, [lastJsonMessage])

    function scrollMsgBoardToBottom() {
        if(user === null) return
        const msgBoard = document.querySelector("#msg-board")
        msgBoard.scrollTo(0, msgBoard.scrollHeight)
    }

    function handleLoginUser(name) {
        setUser(name)
    }

    function handleSendMessage(message) {
        sendJsonMessage({ user: user, msgType: 'message', message: message })
    }

    function handleTypingPartialMessage(message) {
        sendJsonMessage({ user: user, msgType: 'typing', message: message})
    }

    const noMessageBlock =
        <div className={"w-full pt-12"}>
            <p className={"text-center font-semibold text-2xl"}>Still no messages</p>
            <p className={"text-center text-xl"}>Send the first message with the input below </p>
        </div>

  return (
      <>
        <ThemeToggle/>
          {
              (user === null) ?
                  <LoginUser handleLoginUser={handleLoginUser}/> :
                  <div className={"flex flex-col h-full space-y-4"}>
                      <div id={"msg-board"}
                           className={"grow border-2 border-stone-900/20 rounded-lg p-2 space-y-2 overflow-x-hidden overflow-scroll bg-white dark:bg-gray-800 dark:text-white transition duration-300"}>
                          {
                              (messages.length === 0) ?
                                  noMessageBlock :
                                  <MessageBoard messages={messages} user={user}/>
                          }
                      </div>

                      <div>
                          <SendMessage handleSendMessage={handleSendMessage} handleTypingMessage={handleTypingPartialMessage}/>
                      </div>
                  </div>
          }
      </>
  )
}

export default App
