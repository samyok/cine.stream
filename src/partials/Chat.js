import React, {useCallback, useState} from "react";
import "./chat.sass";


export default function Chat({ws, chats, emojis}) {
    const [chatMessage, setChatMessage] = useState(null);
    const sendChat = useCallback(() => {
        ws.emit('chat', {message: chatMessage})
        setChatMessage('');
    }, [ws, chatMessage])
    return <div className="chatContainer">
        <div className="chatbox">
            {chats.filter(a => a.username !== "undefined left").map(chat => {
                let cleanChat = chat.message;
                let twitchEmojiFied = cleanChat.split(" ").map(word => {
                    let possible = emojis.filter(a => word === a.name)[0];
                    // console.log(possible);
                    if(possible) return <img className="twitch-emoji" src={possible.src} alt="" style={{width: 20}}/>
                    else return word + " ";
                })

                return <div className="chatMessage">
                    <img
                        src={'img/' + chat.image + '1.png'}
                        alt="avatar"/>
                    <span className="author">{chat.username}</span>
                    <div className="actualMessage">{twitchEmojiFied}</div>
                </div>
            })}
        </div>
        <input type="text" placeholder={"chat :D"} style={{margin: 0}} value={chatMessage}
               onChange={(event) => setChatMessage(event.currentTarget.value)}
               onKeyPress={(event) => event.code === "Enter" ? sendChat() : ''}
        />
    </div>
}
