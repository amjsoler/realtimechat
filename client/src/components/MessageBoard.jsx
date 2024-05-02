import {MessageBubble} from "./MessageBubble.jsx";

export function MessageBoard({messages}) {
    return (
        messages.map((message) => {
            return <MessageBubble key={message.id} message={message}/>
        })
    )
}