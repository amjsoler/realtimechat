import {LoadingDots} from "./LoadingDots.jsx";

export function MessageBubble({message, myOwnMessage}) {

    function getFormattedDate(timestamp) {
        let formatedDate = "";

        const date = new Date(timestamp);
        formatedDate += date.getDate().toString().padStart(2, 0) + "/"
        formatedDate += date.getMonth().toString().padStart(2, 0) + "/"
        formatedDate += date.getFullYear().toString() + " "
        formatedDate += date.getHours().toString().padStart(2, 0) + ":"
        formatedDate += date.getMinutes().toString().padStart(2, 0) +"h"

        return formatedDate
    }

    const bubbleClasses = "relative flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700 transition duration-300" + (myOwnMessage ? " rounded-tr-none" : " rounded-tl-none")
    return (
        <div key={message.id} className={
            myOwnMessage ?
                "flex justify-end gap-2.5" :
                "flex items-start gap-2.5"
        }
        >
            <div
                className={
                    bubbleClasses
                }
            >
                {
                    message.msgType === "typing" ?
                        (
                            <div className={"absolute flex flex-row justify-center space-x-2 right-6 top-5 w-10 h-3"}>
                                <LoadingDots/>
                            </div>
                        ) : null
                }
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {message.user}
                                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{getFormattedDate(message.timestamp)}</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {message.message}
                </p>
            </div>
        </div>
    )
}