import fs from 'fs'

export function saveMessageToStorage() {

    fs.readFileSync("server/database/chatHistory.json", "utf8", (err, data) => {
        if (err) {
            console.log("Error reading file")
            return
        }
        console.log(data)
    })
}