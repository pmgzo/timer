"use client";

import { ChangeEvent, useEffect, useState } from "react";

const isInteger = (value: string) => /^[0-9]{1,}$/.test(value)

const formatTimeNumber = (value: number): string => {
  return `${Math.floor(value)}`.padStart(2, "0")
}

interface TimerState {
  activated: boolean;
  timestamp: number;
  time: number// in millisecs 
}

export default function Home() {

  const [minuteTimer, setMinuteTimer] = useState<number>(0);
  const [secondTimer, setSecondTimer] = useState<number>(0);

  const [timer, setTimer] = useState<TimerState>({activated: false, timestamp: 0, time: 0});


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

    const now = Date.now()
    if (timer.activated) {
      const ellapsedTime = now - timer.timestamp

      if (ellapsedTime >= timer.time) {
        setTimer({activated: false, timestamp: 0, time: 0})
      }
      else {
        const interval =  setInterval(() => {
          const now2 = Date.now()
          const ellapsedTime2 = now2 - timer.timestamp

          setMinuteTimer(Math.trunc((timer.time - ellapsedTime2) / 1000 / 60))
          setSecondTimer(Math.trunc((timer.time - ellapsedTime2) / 1000 % 60))
        }, 1000);

        return () => clearInterval(interval)
      }
    }
  }, [timer, minuteTimer, secondTimer])

  return (
    <div>
      <div className="text-7xl">
        {formatTimeNumber(minuteTimer)}:{formatTimeNumber(secondTimer)}
      </div>
      <div className="flex flex-row">
        <input name="minute-input" value={minuteTimer} onChange={changeMinuteTimer}/>
        <input name="second-input" value={secondTimer} onChange={changeSecondTimer}/>
        <button className="bg-green-400" onClick={() => {
          setTimer({activated: true, timestamp: Date.now(), time: minuteTimer * 60 * 1000 + secondTimer * 1000})
        }
      }>Start</button>
        <button className="bg-red-400" onClick={() => {
          setTimer({activated: false, timestamp: 0, time: 0})
          setMinuteTimer(0)
          setSecondTimer(0)
        }
      }>Reset</button>
      
      </div>
    </div>
  );
}
