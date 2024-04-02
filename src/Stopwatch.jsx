import { useState, useRef, useEffect } from "react";

function Scripts(){
    const [isRunning, setIsRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning){
            intervalIdRef.current = setInterval(() => {
                setTimeElapsed(Date.now() - startTimeRef.current);
            } ,10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - timeElapsed;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setTimeElapsed(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(timeElapsed / (1000 * 60 *60));
        let min = Math.floor(timeElapsed / (1000 * 60) % 60);
        let sec = Math.floor(timeElapsed / (1000) % 60);
        let ms = Math.floor((timeElapsed % 1000) / 10); 

        hours = String(hours).padStart(2, "0")
        min = String(min).padStart(2, "0")
        sec = String(sec).padStart(2, "0")
        ms = String(ms).padStart(2, "0")

        return `${hours}:${min}:${sec}:${ms}`;
    }


    return(
        <>
        <h1>Stopwatch</h1>
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="reset-button" onClick={reset}>Reset</button>
                <button className="stop-button" onClick={stop}>Stop</button>
            </div>
        </div>
        </>
    )
}

export default Scripts