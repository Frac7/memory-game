import { Text, Button } from "@chakra-ui/react";

import useTimerStore, { timerSelector } from "@/store/useTimerStore";
import { useShallow } from "zustand/react/shallow";

const Timer = () => {
  const { isActive, timer, stopTimer, startTimer } = useTimerStore(
    useShallow(timerSelector)
  );
  return (
    <>
      <Text>Timer: {timer}</Text>
      {isActive && <Button onClick={stopTimer}>Pause</Button>}
      {!isActive && <Button onClick={startTimer}>Start</Button>}
    </>
  );
};

export default Timer;
