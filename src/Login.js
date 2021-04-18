import React, {useState, useEffect, useRef, useCallback} from "react";
import {AvatarGenerator} from 'random-avatar-generator';
import {animate} from "./LandingPage";
import './landingpage.sass'

const generator = new AvatarGenerator();

export default function Login({ws, roomID, setState}) {

    const [animating, setAnimating] = useState(1);
    const [avatar, setAvatar] = useState({
        random: false,
        src: null
    })
    const [username, setUsername] = useState(null)


    let avatarImageSRC = avatar.src ||
        (avatar.random ? generator.generateRandomAvatar() : generator.generateRandomAvatar(username?.trim()));

    return <div className="centerbox-container" style={{opacity: animating}}>
        <div className="centerbox">
            <h1>{roomID ? 'join' : 'create'} a cinespace</h1>

            <input type="text" placeholder={'your username'} required value={username} onChange={(ev) => {
                setUsername(ev.currentTarget.value)
            }}/>
            <button onClick={() => {
                if (username?.trim().length > 1) {
                    ws.emit('auth', {
                        username,
                        avatar: avatarImageSRC,
                        newRoom: !roomID,
                        roomID
                    })
                    setState({
                        page: 'world',
                        data: {newRoom: true, king: true}
                    })
                }
            }}>{roomID ? 'Join' : 'Create'}
            </button>
        </div>
    </div>
}