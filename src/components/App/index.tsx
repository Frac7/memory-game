import { Heading, Flex } from "@chakra-ui/react";

import Board from "@/components/Board";
import useInitCards from "./useInitCards";
import Modal from "../Modal";
import useGameStore, { isCompletedSelector } from "@/store/useGameStore";
import { useShallow } from "zustand/react/shallow";

function App() {
  useInitCards();
  const isCompleted = useGameStore(useShallow(isCompletedSelector));

  return (
    <>
      <Modal isOpen={isCompleted} />
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        style={{ minHeight: "100vh" }}
      >
        <Heading>React Memory Game</Heading>
        <Board />
      </Flex>
    </>
  );
}

export default App;
