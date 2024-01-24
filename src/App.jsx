import { useState, useEffect, useMemo } from "react";

let timerId;
const App = () => {
  const [seconds, setSeconds] = useState(60);
  const [maxVal, setMaxVal] = useState(60);

  useMemo(() => {
    if (maxVal < seconds) {
      setMaxVal(seconds);
    }
  }, [maxVal, seconds]);

  useEffect(() => {
    timerId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  const reset = () => {
    clearInterval(timerId);
  };

  const calcPercentage = () => {
    // const totalTime = Math.floor(seconds / 60) * 60 + seconds;

    const percentage = (seconds / maxVal) * 100;
    // console.log(Math.max(60, seconds));

    return percentage;
  };

  return (
    <>
      <div className="main-container">
        <h1>Routine Starting in</h1>
        <p>Subheading Here</p>

        <div className="outer-container">
          <div
            className="outer"
            style={{
              background: `conic-gradient(#7a1f91 ${calcPercentage()}%, #ecf0f1 ${calcPercentage()}%)`,
            }}
          >
            <div className="inner">
              {Math.floor(seconds / 60) < 10
                ? `0${Math.floor(seconds / 60)}`
                : Math.floor(seconds / 60)}{" "}
              :{" "}
              {Math.floor(seconds % 60) < 10
                ? `0${Math.floor(seconds % 60)}`
                : Math.floor(seconds % 60)}
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button type="button" onClick={() => setSeconds(seconds + 10)}>
            +10 Sec
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
