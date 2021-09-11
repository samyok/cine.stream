import React, {useState, useEffect, useRef, useCallback} from "react";
import {io} from "socket.io-client";

import Chat from './partials/Chat';
import Controls from './partials/Controls';


const rad = (x) => x * Math.PI / 180;

export default function World({ws, sid, state}) {
    const acceleration = 0.5;
    const maxSpeed = 10;
    const turnSpeed = .1;

    const [roomYRotation, _setRoomYRotation] = useState(0);
    const [dr, setDr] = useState(0);

    const [value, setValue] = useState(0); // integer state; used to force render

    // start with the center of the box in the center of the screen
    const [offset, setOffset] = useState(-(window.innerWidth) / 2);

    const [posX, _setPosX] = useState(0);
    const [posZ, _setPosZ] = useState(offset + 1196 / 2);
    const cameraCoordinates = useRef({posX, posZ});

    const [avatars, setAvatars] = useState({});

    const videoRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);

    const [chats, setChats] = useState([]);

    const [king, setKing] = useState(false);

    const [twitchEmojis, setTwitchEmojis] = useState([]);

    // set interval but react hook
    // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    // == INCOMING WEBSOCKET == beep boop beep boop
    useEffect(() => {
        console.log(ws);
        ws.on('avatars', data => {
            setAvatars(data)
            setValue(pv => (pv + 1) % 100);
        });
        if (!state.data.king) ws.on('status', (data) => {
            console.log(data);
            videoRef.current.src = data.src;
            videoRef.current.currentTime = data.currentTime;
            if (data.paused) videoRef.current.pause();
            else videoRef.current.play();
        });
        ws.on('chat', (chat) => {
            setChats(pv => [...pv, chat])
            console.log(chat);
        })

    }, [ws])

    const updateWS = useCallback(() => {
        ws.emit('update', {
            src: videoRef.current.src,
            currentTime: videoRef.current.currentTime,
            paused: videoRef.current.paused
        })
    }, [ws, videoRef])


    // emit current location every 100ms
    useInterval(() => {
        ws.emit('location', {posZ: posZ - (offset + 1196 / 2), posX});
    }, 100, [posX, posZ])


    // helper functions: location (dxyz) math
    const dy = (window.innerHeight - 596) / 2;
    const setMaxMinPos = v => v; // Math.max(-500, Math.min(v, 500)); // use this if you want them boxed in a 500x500px
    const setPosX = obj => {
        if (typeof obj === "function") _setPosX(pv => setMaxMinPos(obj(pv)));
        else _setPosX(setMaxMinPos(obj));
        cameraCoordinates.current = {...cameraCoordinates.current, posX}
    }
    const setPosZ = obj => {
        if (typeof obj === "function") _setPosZ(pv => setMaxMinPos(obj(pv)));
        else _setPosZ(setMaxMinPos(obj));
        cameraCoordinates.current = {...cameraCoordinates.current, posZ}
    }
    const roomYRotationRef = useRef(0);
    const setRoomYRotation = (obj) => {
        if (typeof obj === "function") {
            _setRoomYRotation(pv => {
                let nv = obj(pv);
                roomYRotationRef.current = nv;
                return nv % 360;
            })
        } else {
            _setRoomYRotation(pv => {
                roomYRotationRef.current = obj;
                return obj % 360;
            })
        }
    }

    // helper functions: interactions
    const keysPressed = useRef([]);
    const addKey = (name) => keysPressed.current = Array.from(new Set([...keysPressed.current, name]));
    const removeKey = (name) => {
        let keySet = new Set(keysPressed.current);
        keySet.delete(name);
        keysPressed.current = Array.from(keySet);
    }

    // helper functions: speed
    function speed(currentVal, posOrNeg) {
        return maxSpeed * posOrNeg;
        // the two equations this first line combines are
        //   acceleration + currentVal >= maxSpeed --> then just return maxSpeed
        //   -acceleration + currentVal <= -maxSpeed --> then just return -maxSpeed
        if (posOrNeg * currentVal + acceleration >= posOrNeg * maxSpeed) return posOrNeg * maxSpeed;
        else return currentVal + posOrNeg * acceleration;
    }

    const speedValue = useRef(0);

    // helper functions: server update + on interaction code
    const keyFuncs = code => {
        switch (code) {
            // case "ArrowRight":
            //     setDr(pv => pv + 1);
            //     break;
            // case "ArrowLeft":
            //     setDr(pv => pv - 1);
            //     break;
            case "ArrowUp":
                setPosX(pv => pv + Math.cos(rad(roomYRotationRef.current)) * maxSpeed);
                setPosZ(pv => pv + Math.sin(rad(roomYRotationRef.current)) * maxSpeed)
                break;
            case "ArrowDown":
                setPosX(pv => pv + Math.cos(rad(roomYRotationRef.current + 180)) * maxSpeed);
                setPosZ(pv => pv + Math.sin(rad(roomYRotationRef.current + 180)) * maxSpeed)
                break;
            case "ArrowRight":
                setPosX(pv => pv + Math.cos(rad(roomYRotationRef.current + 90)) * maxSpeed);
                setPosZ(pv => pv + Math.sin(rad(roomYRotationRef.current + 90)) * maxSpeed)
                break;
            case "ArrowLeft":
                setPosX(pv => pv + Math.cos(rad(roomYRotationRef.current - 90)) * maxSpeed);
                setPosZ(pv => pv + Math.sin(rad(roomYRotationRef.current - 90)) * maxSpeed)
                break;
            // case "Space":
            //     setOffset(-(window.innerWidth) / 2)
            //     setPosZ(offset + 1196 / 2);
            //     setPosX(0);
            //     setRoomYRotation(0);
            //     setDr(0);
            //     break;
            default:
                console.log(code);
                break;
        }
    }
    const update = useCallback(() => {
        let keys = keysPressed.current;
        keys.forEach(code => keyFuncs(code));
    }, [keyFuncs])
    useEffect(() => {
        document.addEventListener("keydown", ev => {
            addKey(ev.code);
        });
        document.addEventListener("keyup", ev => {
            removeKey(ev.code)
        })
        document.body.addEventListener("click", document.body.requestPointerLock || document.body.mozRequestPointerLock);

        document.addEventListener("mousemove", updateRotation, false);

        function updateRotation(ev) {
            if (document.pointerLockElement ||
                document.mozPointerLockElement) {
                setRoomYRotation(pv => pv + ev.movementX * turnSpeed)
            }
        }

        setInterval(update, 50)
    }, [])

    useEffect(() => {
        fetch("./twitchemojis.json").then(r => r.json()).then(r => setTwitchEmojis(r))
    }, [])

    return (
        <>
            <Chat ws={ws} chats={chats} emojis={twitchEmojis}/>
            {state.data.king && <Controls ws={ws} videoRef={videoRef} updateWS={updateWS}/>}
            <section id="container">
                <div id="room" style={{
                    transform: `rotateY(${roomYRotation}deg)`
                }}>
                    {face({
                        orientation: 'N', dy,
                        dz: posZ,
                        dx: posX,
                        styles: {backgroundColor: 'rgba(0,0,0,0.3)'},
                        inside: <video
                            ref={videoRef}
                            src={videoSrc}
                            style={{width: '100%', height: '100%'}}
                            autoPlay={true}/>
                    })}
                    {/*{box({posX, posZ, dy, size: 50, y: -25})}*/}
                    <RenderAvatars sid={sid} avatars={avatars} posX={posX} posZ={posZ} dy={dy}
                                   key={JSON.stringify(avatars)}/>
                    {/*{debugFaces({posX, posZ, dy})}*/}
                </div>
            </section>

            <pre style={{display: 'none', color: 'white', position: 'fixed', top: 0, backgroundColor: 'black'}}>
               rot: {roomYRotation}deg <br/>
               dx: {posX}px dz: {posZ}px <br/>
               dr: {dr}deg offset: {offset}px <br/>
               sid: {sid} <br/>
               val: {value}
           </pre>
        </>
    );

}

/**
 * Creates a face [3D Wall]
 *
 * @param width
 * @param height
 * @param styles
 * @param inside
 * @param orientation
 * @param dz
 * @param dx
 * @param dy
 * @param dr
 * @returns {JSX.Element}
 */
function face({
    width = 1196, height = 596, styles = {}, inside, orientation, dz, dx, dy, dr = 0
}
)
{
    let transform = {
        N: `rotateY(${dr}deg) translateZ(${dx}px) translateX(${-dz}px) translateY(${dy}px)`,
        E: `rotateY(${-90 + dr}deg) translateZ(${dz}px) translateX(${dx}px) translateY(${dy}px)`,
        W: `rotateY(${90 + dr}deg) translateZ(${dz}px) translateX(${dx}px) translateY(${dy}px)`,
        S: `rotateY(${180 + dr}deg) translateZ(${dx}px) translateX(${dz}px) translateY(${dy}px)`,
        T: `rotateX(90deg) translateZ(${dy}px) translateX(${-dz}px) translateY(${dx}px)`,
        B: `rotateX(90deg) translateZ(-${dy}px) translateX(${-dz}px) translateY(${dx}px)`,
    }
    let extraStyles = ['T', 'B'].includes(orientation) ? {
        // width: 1196,
        // height: 1196,
        // top: -300,
    } : {fontSize: height * .9}
    return <figure style={{
        width,
        height,
        transform: transform[orientation],
        ...extraStyles,
        ...styles,
    }}>
        {
            inside || orientation
        }
    </figure>
}

function debugFaces(
{
    posX, posZ, dy
}
)
{
    let size = 50;
    return <>{face({
        orientation: 'N',
        dz: 0,
        dx: 0,
        dy: dy,
        styles: {backgroundColor: 'yellow'},
        width: size,
        height: size,
        inside: 'X'
    })}
        {face({
            orientation: 'E',
            dz: 0,
            dx: 0,
            dy: dy,
            styles: {backgroundColor: 'yellow'},
            width: size,
            height: size,
            inside: 'Z'
        })}
        {face({
            orientation: 'N',
            dz: posZ,
            dx: posX,
            dy: dy,
            styles: {backgroundColor: 'green'},
            width: size,
            height: size,
            inside: 'X'
        })}
        {face({
            orientation: 'E',
            dz: posZ,
            dx: posX,
            dy: dy,
            styles: {backgroundColor: 'green'},
            width: size,
            height: size,
            inside: 'Z'
        })}
    </>
}

function box(
{
    posX, posZ, dy, x = 200, y = 0, z = -300, size = 100
}
)
{
    return <>
        {face({
            orientation: 'N',
            dz: posZ + z,
            dx: posX + x,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: 'red'},
            width: size,
            height: size,
            inside: 'a'
        })}
        {face({
            orientation: 'E',
            dz: posZ + z - size / 2,
            dx: posX + x - size / 2,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: 'green'},
            width: size,
            height: size,
            inside: 'a'
        })}
        {face({
            orientation: 'E',
            dz: posZ + z + size / 2,
            dx: posX + x - size / 2,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: 'blue'},
            width: size,
            height: size,
            inside: 'a'
        })}
        {face({
            orientation: 'N',
            dz: posZ + z,
            dx: posX + x - size,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: 'pink'},
            width: size,
            height: size,
            inside: 'a'
        })}
    </>
}

function rotatePlane(
{
    x, z, r
}
)
{
    // math here https://www.geogebra.org/geometry/yxzwugkv
    let deg = rad(r);
    let coordX = Math.abs(x) * Math.cos(deg) + Math.abs(z) * Math.sin(deg);
    let coordZ = Math.abs(x) * Math.sin(deg) - Math.abs(z) * Math.cos(deg);
    let dist = Math.sqrt(Math.pow(x - coordX, 2) + Math.pow(z - coordZ, 2));
    let angleEAA = (Math.atan(Math.abs(x / z)) * 180 / Math.PI) + 90 - r / 2;
    return [dist * Math.sin(rad(angleEAA)), dist * Math.cos(rad(angleEAA))];
}

function avatar(
{
    color = 'darkblue', posX, posZ, dy, x = 200, y = 0, z = -300, size = 51, dr = 0, sid
}
)
{
    // let [mvX, mvZ] = rotatePlane({x: posX + x, z: posZ + z, r: dr});
    let dz = (posZ + z)// - mvZ// + mvX;
    let dx = (posX + x)// + mvX// + mvZ;
    let avatarStyles = {
        margin: 0
    }
    return <>
        {face({
            orientation: 'N',
            dz,
            dx,
            dy: dy + 596 + y - size,
            dr,
            styles: {backgroundColor: color, fontSize: 5},
            width: size,
            height: size,
            inside: <img style={avatarStyles} src={'img/' + color + '2.png'} alt=""/>
        })}
        {face({
            orientation: 'E',
            dz: posZ + z - (5 / 6) * size,
            dx: posX + x - size / 6,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: color, fontSize: 10},
            width: size / 3,
            height: size,
            inside: <img style={avatarStyles} src={'img/' + color + '3.png'} alt=""/>
        })}
        {face({
            orientation: 'E',
            dz: posZ + z + size / 6,
            dx: posX + x - size / 6,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: color, fontSize: 10},
            width: size / 3,
            height: size,
            inside: <img style={avatarStyles} src={'img/' + color + '3.png'} alt=""/>
        })}
        {face({
            orientation: 'N',
            dz: posZ + z,
            dx: posX + x - size / 3,
            dy: dy + 596 + y - size,
            styles: {backgroundColor: color},
            width: size,
            height: size,
            inside: <img style={avatarStyles} src={'img/' + color + '1.png'} alt=""/>
        })}
    </>
}

function RenderAvatars(
{
    sid, avatars, posX, posZ, dy
}
)
{
    return Object.keys(avatars).map(a => {
        let av = avatars[a];
        if (a !== sid)
            return avatar({
                color: av.color,
                posX,
                posZ,
                dy,
                size: 51,
                y: -225,
                x: -av.posX + 600,
                z: -av.posZ - 1196 / 2 + 25,
                dr: 0,
                sid: a
            })

    })
}
