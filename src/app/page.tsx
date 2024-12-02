"use client";

import StartButton, { ButtonState } from "@/components/StartButton";
import { ChangeEvent, useEffect, useState } from "react";

const isInteger = (value: string) => /^[0-9]{1,}$/.test(value);

const formatTimeNumber = (value: number): string => {
  return `${Math.floor(value)}`.padStart(2, "0");
};

interface TimerState {
  state: ButtonState;
  timestamp: number;
  time: number; // in millisecs
}

export default function Home() {
  const [minuteTimer, setMinuteTimer] = useState<number>(0);
  const [secondTimer, setSecondTimer] = useState<number>(0);

  const [timer, setTimer] = useState<TimerState>({
    state: ButtonState.stopped,
    timestamp: 0,
    time: 0,
  });

  function resetTimer() {
    setTimer({ state: ButtonState.stopped, timestamp: 0, time: 0 });
    setMinuteTimer(0);
    setSecondTimer(0);
  }

  function toggleStartButton() {
    if (timer.state === ButtonState.stopped) {
      setTimer({
        state: ButtonState.started,
        timestamp: Date.now(),
        time: minuteTimer * 60 * 1000 + secondTimer * 1000,
      });
    }
    if (timer.state === ButtonState.paused) {
      setTimer({
        state: ButtonState.started,
        timestamp: Date.now(),
        time: timer.time,
      });
    }
    if (timer.state == ButtonState.started) {
      const ellapsedTime2 = Date.now() - timer.timestamp;
      setTimer({
        state: ButtonState.paused,
        timestamp: timer.timestamp,
        time: timer.time - ellapsedTime2,
      });
    }
  }

  function changeSecondTimer({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    if (value === "") {
      setSecondTimer(0);
    }
    if (isInteger(value)) {
      setSecondTimer(parseInt(value));
    }
  }

  function changeMinuteTimer({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) {
    if (value === "") {
      setMinuteTimer(0);
    }
    if (isInteger(value)) {
      setMinuteTimer(parseInt(value));
    }
  }

  useEffect(() => {
    const now = Date.now();
    if (timer.state === ButtonState.started) {
      const ellapsedTime = now - timer.timestamp;

      if (ellapsedTime >= timer.time) {
        setTimer({ state: ButtonState.stopped, timestamp: 0, time: 0 });
      } else {
        const interval = setInterval(() => {
          const now2 = Date.now();
          const ellapsedTime2 = now2 - timer.timestamp;

          setMinuteTimer(Math.trunc((timer.time - ellapsedTime2) / 1000 / 60));
          setSecondTimer(
            Math.trunc(((timer.time - ellapsedTime2) / 1000) % 60),
          );
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [timer, minuteTimer, secondTimer]);

  return (
    <div className="mt-10 flex justify-center">
      <div className="flex flex-col w-[400px] h-[150px] border-2 border-white">
        <div className="flex justify-center ">
          <input
            className="caret-white bg-black focus:bg-white focus:text-black focus:outline-white text-7xl w-[70px] h-[60px]"
            name="timerInput"
            value={formatTimeNumber(minuteTimer)}
            onChange={changeMinuteTimer}
          />
          <div className="text-7xl">:</div>
          <input
            className="caret-white bg-black focus:bg-white focus:text-black focus:outline-white text-7xl w-[70px] h-[60px]"
            name="timerInput"
            value={formatTimeNumber(secondTimer)}
            onChange={changeSecondTimer}
          />
        </div>

        <div className="flex justify-center space-x-4">
          <StartButton state={timer.state} toggle={toggleStartButton} />
          <button
            className="p-3 rounded bg-red-400 hover:bg-red-600"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
