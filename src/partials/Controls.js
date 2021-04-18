import React, {useEffect, useRef, useState} from "react";
import "./control.sass";

export default function Control({ws, videoRef, updateWS}) {

    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        ws.on('status', (data) => {
            console.log(data);
            if (videoRef.current) videoRef.current.src = data.src;
            if (videoRef.current) videoRef.current.currentTime = data.currentTime;
            if (data.paused) videoRef.current.pause();
            else videoRef.current.play();
        });
        setTimeout( () => {
            if(!videoRef.current.src) {
                videoRef.current.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
                videoRef.current.play()
                setPlaying(true);
            }
            updateWS();
        }, 5000)
    }, [updateWS, videoRef, ws])

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

    useInterval(() => {
        if (!isScrubbing) setScrubber(videoRef.current?.currentTime || 0)
    }, 1000)

    let [scrubber, setScrubber] = useState(videoRef.current?.currentTime || 0);
    let [isScrubbing, setIsScrubbing] = useState(false);
    if (!videoRef.current) return <div className="controlContainer">
        <div className="controlbox">
            <p>Loading...</p>
        </div>
    </div>


    return <div className="controlContainer">
        <div className="controlbox">
            <button className="icon" onClick={() => {
                if (playing) videoRef.current.pause();
                else videoRef.current.play();
                setPlaying(pv => !pv);
                updateWS();
            }}>
                <span className="material-icons-two-tone">
                    {playing ? 'pause' : 'play_arrow'}
                </span>
            </button>

            <span
                className={'scrubber'}>{videoRef.current.currentTime / 60 >> 0}:{((videoRef.current.currentTime >> 0) % 60).toString().padStart(2, '0')}</span>
            <input
                onMouseDown={() => setIsScrubbing(true)}
                onMouseUp={() => {
                    videoRef.current.currentTime = scrubber;
                    updateWS();
                    setIsScrubbing(false)
                }}
                type="range" value={scrubber} min={0} max={videoRef.current?.duration || 0}
                onChange={evt => {
                    setScrubber(evt.currentTarget.value);
                }}
            />
            <button className="icon" onClick={() => {
                videoRef.current.src = prompt('New video URL');
                videoRef.current.currentTime = 0;
                updateWS();
            }}>
                <span className="material-icons-two-tone">
                    playlist_add
                </span>
            </button>
        </div>
    </div>
}