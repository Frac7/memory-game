import { Heading, Flex } from "@chakra-ui/react";

import Board from "@/components/Board";
import useGameTimer from "./useGameTimer";
import useInitCards from "./useInitCards";

function App() {
  useGameTimer();
  useInitCards();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
      style={{ minHeight: "100vh" }}
    >
      <Heading>React Memory Game</Heading>
      <Board />
    </Flex>
  );
}

export default App;
