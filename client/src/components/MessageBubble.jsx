export function MessageBubble({message, myOwnMessage}) {

    function getFormattedDate(timestamp) {
        let formatedDate = "";

        const date = new Date(timestamp);
        formatedDate += date.getFullYear().toString() + "/"
        formatedDate += date.getMonth() + "/"
        formatedDate += date.getDate() + " "
        formatedDate += date.getHours() + ":"
        formatedDate += date.getMinutes()

        return formatedDate
    }
    return (
        <div key={message.id} className={
            myOwnMessage ?
                "flex justify-end gap-2.5" :
                "flex items-start gap-2.5"
        }
        >
            <div
                className={
                "flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700"}>
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