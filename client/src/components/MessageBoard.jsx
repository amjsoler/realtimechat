import {MessageBubble} from "./MessageBubble.jsx";

export function MessageBoard({messages, user}) {
    return (
        messages.map((message) => {
            return <MessageBubble key={message.id} myOwnMessage={(user === message.user)}  message={message}/>
        })
    )
}