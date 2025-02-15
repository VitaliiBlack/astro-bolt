import type React from 'react';
import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface CountdownProps {
  endTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ endTime }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const difference = endTime - now;
    let timeLeft: TimeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [endTime]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const formatTime = (value?: number): string => {
    if (value === undefined) return '00';
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <span>
      {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
    </span>
  );
};

export default Countdown;
