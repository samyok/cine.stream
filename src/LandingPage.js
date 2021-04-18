import React, {useState, useEffect, useRef, useCallback} from "react";

import "./landingpage.sass";

/**
 * Helper animate function
 * @param func
 * @param interval
 * @param from
 * @param to
 * @param step
 * @returns {Promise<number>}
 */
export function animate({func, interval = 50, from = 1, to = 0, step = 0.17}) {
    const sleep = n => new Promise(r => setTimeout(r, n));
    return new Promise(async resolve => {
        let val = from;
        while (val > to) {
            val -= step;
            func(val);
            await sleep(interval);
        }
        resolve(val);
    })
}

export default function LandingPage({setState, loading}) {
    const [animating, setAnimating] = useState(1);
    return <div className="centerbox-container" style={{opacity: animating}}>
        <div className="centerbox">
            <h1>cine.stream</h1>
            <h2>watch together. in 3D. online.</h2>
            <p>No more "3..2..1..Start!" <br/>Join a <i>cinestream</i> to watch closely, virtually.</p>
            <button
                disabled={loading}
                onClick={() => {
                    animate({func: setAnimating}).then(() =>
                        setState({
                            page: 'login',
                            data: {newRoom: true}
                        })
                    )
                }}
            >Create a room
            </button>
            <br/>
            <button
                className={'small'}
                disabled={loading}
                onClick={() => {
                    animate({func: setAnimating}).then(() =>
                        setState({
                            page: 'rooms',
                            data: {}
                        })
                    )
                }}
            >Find a public room
            </button>
        </div>
        <div className="copyright">Created in &lt;24 hours by Samyok and Sampada Nepal</div>
    </div>
}