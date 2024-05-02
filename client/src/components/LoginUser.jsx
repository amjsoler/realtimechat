import {useState} from "react";

export function LoginUser({handleLoginUser}) {

    const [name, setName] = useState("")

    function onFormSubmit(e) {
        e.preventDefault()
        handleLoginUser(name)
    }
    return (
        <section className="dark:bg-gray-900 h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-full">
                <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Who you are?
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={onFormSubmit}
                        >
                            <div>
                                <input type="text"
                                       value={name}
                                       required="required"
                                       minLength={3}
                                       maxLength={15}
                                       autoFocus={true}
                                        onChange={(e) => setName(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-blue-300"
                                       placeholder="Your name"
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Enter the chat
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}