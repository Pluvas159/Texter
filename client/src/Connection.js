/* functions for communication with BE, first two are for individual chats,
second two are for getting chats and adding people to chat with */


module.exports.getChatters = function getChatters(user_name, pushChats, location){
        try {
            fetch(`http://${location}:5000/api/getchat?` + new URLSearchParams({
                name: user_name,
            }),
                {
                    method: "GET",
                    mode: "cors",
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => pushChats(data))
                    } else {
                        alert("Message failed to send.")
                    }
                })
        } catch {
            console.error("chyba")
        }
    }

module.exports.postChat = (user_name, other_user_name, location) => {
        try {
            fetch(`http://${location}:5000/api/postchat`, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user_name, other_user_name: other_user_name}),
            }).then((response) => {
                if (response.status === 200) {
                } else {
                    alert("Message failed to send.")
                }
            })
        } catch {
            console.error("chyba")
        }
}

module.exports.getMessage = (user_name, other_user_name, pushMessage, location) => {
        try {
            fetch(`http://${location}:5000/api/get?` + new URLSearchParams({
                name: user_name,
                other: other_user_name,
            }),
                {
                    method: "GET",
                    mode: "cors",
                }).then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => pushMessage(data))
                    } else {
                        alert("Message failed to send.")
                    }
                })
        } catch {
            console.error("chyba")
        }
 }

module.exports.postMessage = (user_name, other_user_name, message, location) => {
        try {
            fetch(`http://${location}:5000/api/post`, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sender: user_name, recipient: other_user_name, message: message }),
            }).then((response) => {
                if (response.status === 200) {
                } else {
                    alert("Message failed to send.")
                }
            })
        } catch {
            console.error("chyba")
        }
} 