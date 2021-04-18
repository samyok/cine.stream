import React, {useState, useEffect, useRef, useCallback} from "react";
import {io} from "socket.io-client";
import "./room.css";

import World from './World';
import LandingPage from "./LandingPage";
import Login from "./Login";

function App() {
    const ws = useRef({});
    const [connectedWS, setConnectedWS] = useState(false);
    const [sid, setSID] = useState(null);
    const [roomID, setRoomID] = useState(window.location.pathname.substring(1));
    const [state, setState] = useState({
        page: roomID ? 'login' : 'landing',
        data: null
    })
    // const debugLanding = true;
    useEffect(() => {
        if (connectedWS) return;
        fetch('/ws').then(r => r.json()).then(r => {
            ws.current = io(r.endpoint);
            console.log('connected to ws');
            setConnectedWS(true);
            ws.current.on('auth', () => {
                console.log(ws.current.id);
                setSID(ws.current.id);
            })
            ws.current.on('room', (data) => {
                window.history.pushState(null, null, data)
                setRoomID(data)
            })
            ws.current.on('closedroom', () => window.location.href = '/');
        })
    }, [connectedWS])
    return <>
        {state.page === 'landing' && <LandingPage setState={setState} loading={!connectedWS}/>}
        {state.page === 'login' && <Login roomID={roomID} ws={ws.current} setState={setState}/>}
        {state.page === 'world' && <World roomID={roomID} sid={sid} ws={ws.current} state={state}/>}
    </>
}

export default App;

