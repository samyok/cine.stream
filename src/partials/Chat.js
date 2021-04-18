import React, {useState, useEffect, useRef, useCallback} from "react";
import "./chat.sass";

export default function Chat({ws, chats}) {
    const [chatMessage, setChatMessage] = useState(null);
    const sendChat = useCallback(() => {
        ws.emit('chat', {message: chatMessage})
        setChatMessage('');
    }, [ws, chatMessage])
    return <div className="chatContainer">
        <div className="chatbox">
            {chats.filter(a => a.username !== "undefined left").map(chat => <div className="chatMessage">
                <img
                    src={'img/' + chat.image + '1.png'}
                    alt="avatar"/>
                <span className="author">{chat.username}</span>
                <p>{chat.message}</p>
            </div>)}
        </div>
        <input type="text" placeholder={"chat :D"} style={{margin: 0}} value={chatMessage}
               onChange={(event) => setChatMessage(event.currentTarget.value)}
               onKeyPress={(event) => event.code === "Enter" ? sendChat() : ''}
        />
    </div>
}