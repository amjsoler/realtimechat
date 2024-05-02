import './App.css'
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket"
import {SendMessage} from "./components/SendMessage.jsx";
import {MessageBoard} from "./components/MessageBoard.jsx";
import {LoginUser} from "./components/LoginUser.jsx";

function App() {

    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)

    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket("ws://localhost:8080", {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: () => true,
    });

    useEffect(() => {
        scrollMsgBoardToBottom()
    }, [messages]);

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

    const noMessageBlock =
        <div className={"w-full pt-12"}>
            <p className={"text-center font-semibold text-2xl"}>Still no messages</p>
            <p className={"text-center text-xl"}>Send the first message with the input below </p>
        </div>

  return (
      (user === null) ?
          <LoginUser handleLoginUser={handleLoginUser}/> :
          <div className={"flex flex-col h-full space-y-4"}>
              <div id={"msg-board"}
                   className={"grow border-2 border-stone-900/20 rounded-lg p-2 space-y-2 overflow-scroll"}>
                  {
                      (messages.length === 0) ?
                          noMessageBlock :
                          <MessageBoard messages={messages}/>
                  }
              </div>

              <div>
                  <SendMessage handleSendMessage={handleSendMessage}/>
              </div>
          </div>
  )
}

export default App
