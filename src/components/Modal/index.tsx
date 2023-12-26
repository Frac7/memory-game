import useGameStore, { gameControllerSelector } from "@/store/useGameStore";
import useTimerStore, { timerSelector } from "@/store/useTimerStore";
import {
  Button,
  Modal as ChakraModal,
  Flex,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useShallow } from "zustand/react/shallow";

interface ModalProps {
  isOpen: boolean;
}

const Modal: FC<ModalProps> = ({ isOpen }) => {
  const { score, flips } = useGameStore(useShallow(gameControllerSelector));
  const { timer } = useTimerStore(useShallow(timerSelector));
  const { restartGame } = useGameStore();

  return (
    <ChakraModal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game finished!</ModalHeader>
        <ModalBody></ModalBody>
        <Flex justifyContent="space-around">
          <Text>Score: {score}</Text>
          <Text>Flips: {flips}</Text>
          <Text>Time: {60 - timer}</Text>
        </Flex>
        <ModalFooter>
          <Button onClick={restartGame}>Restart</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
