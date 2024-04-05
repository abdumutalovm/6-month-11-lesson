import React, { useState, useEffect } from 'react';
import './App.css';

const Pomodoro = () => {
  const [sessionLength, setSessionLength] = useState(7);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(sessionLength * 60);
  const [intervalId, setIntervalId] = useState(null); // Interval ID uchun xizmat o'zgaruvchisi

  const handleDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setRemainingTime((sessionLength - 1) * 60);
    }
  };

  const handleIncrement = () => {
    setSessionLength(sessionLength + 1);
    setRemainingTime((sessionLength + 1) * 60);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      const id = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime === 0) {
            clearInterval(id);
            return sessionLength * 60;
          } else if (prevTime === 1) {
            clearInterval(id);
            setIsRunning(false); // Vaqt tugatilganida isRunning ni false qilamiz
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalId)
    setRemainingTime(sessionLength * 60);
  };

  useEffect(() => {
    document.title = `${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? '0' : ''}${remainingTime % 60}`;
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col mx-auto mt-5 p-3 items-center justify-center w-80 h-96 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mt-5">Pomodoro</h2>
      <div className="flex justify-between w-3/4 mt-8">
        <div className="flex flex-col items-center mx-auto">
          <label htmlFor="session-length" className="text-lg text-gray-600">Session Length</label>
          <div className="flex items-center">
            <button onClick={handleDecrement} className="text-3xl text-gray-800 hover:text-blue-600 focus:outline-none">-</button>
            <span id="session-length" className="text-3xl font-bold text-gray-800 mx-4">{sessionLength}</span>
            <button onClick={handleIncrement} className="text-3xl text-gray-800 hover:text-blue-600 focus:outline-none">+</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-16">
        <span className="text-4xl font-bold text-gray-800">{formatTime(remainingTime)}</span>
        <button onClick={handleStartPause} className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none">{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset} className="mt-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg focus:outline-none mb-5">Reset</button>
      </div>
    </div>
  );
};

export default Pomodoro;
