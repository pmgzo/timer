"use client";

import { ChangeEvent, useEffect, useState } from "react";

const isInteger = (value: string) => /^[0-9]{1,}$/.test(value)

const formatTimeNumber = (value: number): string => {
  return `${Math.floor(value)}`.padStart(2, "0")
}

export default function Home() {

  const [minuteTimer, setMinuteTimer] = useState<number>(0);
  const [secondTimer, setSecondTimer] = useState<number>(0);

  const [timerActivated, setTimerActivated] = useState<boolean>(false);


  function changeSecondTimer({target: {value}}: ChangeEvent<HTMLInputElement>) {
    if (value === '') {
      setSecondTimer(0)
    }
    if (isInteger(value)) {
      setSecondTimer(parseInt(value))
    }
  }

  function changeMinuteTimer({target: {value}}: ChangeEvent<HTMLInputElement>) {
    if (value === '') {
      setMinuteTimer(0)
    }
    if (isInteger(value)) {
      setMinuteTimer(parseInt(value))
    }
  }

  useEffect(() => {
    if (timerActivated && (secondTimer > 0 || minuteTimer > 0)) {
      const interval = setInterval(() => {
        if (secondTimer === 0) {
          setSecondTimer(59)
          if (minuteTimer > 0) {
            setMinuteTimer(minuteTimer - 1)
          }
        } else {
          setSecondTimer(secondTimer - 1)
        }
      }, 1000);
      return () => clearInterval(interval)
    }
  }, [timerActivated, minuteTimer, secondTimer])

  return (
    <div>
      <div className="text-7xl">
        {formatTimeNumber(minuteTimer)}:{formatTimeNumber(secondTimer)}
      </div>
      <div className="flex flex-row">
        <input name="minute-input" value={minuteTimer} onChange={changeMinuteTimer}/>
        <input name="second-input" value={secondTimer} onChange={changeSecondTimer}/>
        <button className="bg-green-400" onClick={() => {
          setTimerActivated(true)
        }
      }>Start</button>
      </div>
    </div>
  );
}
