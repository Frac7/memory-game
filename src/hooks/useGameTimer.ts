import { useEffect, useRef, useState } from "react";

export default function useGameTimer() {
  const [timer, setTimer] = useState(0);
  const interval = useRef<number>();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval.current);
      setTimer(0);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isActive]);

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };
  const stopTimer = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  return { timer, startTimer, stopTimer };
}
