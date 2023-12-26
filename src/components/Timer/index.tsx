import { Text, Button } from "@chakra-ui/react";
import { RepeatIcon, ArrowRightIcon } from "@chakra-ui/icons";

import useGameTimerStore, { timerSelector } from "@/store/useGameTimerStore";
import { useShallow } from "zustand/react/shallow";

const Timer = () => {
  const { isActive, timer, stopTimer, startTimer } = useGameTimerStore(
    useShallow(timerSelector)
  );
  return (
    <>
      <Text>Timer: {timer}</Text>
      {isActive && (
        <Button onClick={stopTimer} rightIcon={<RepeatIcon />}>
          Pause
        </Button>
      )}
      {!isActive && (
        <Button onClick={startTimer} rightIcon={<ArrowRightIcon />}>
          Start
        </Button>
      )}
    </>
  );
};

export default Timer;
