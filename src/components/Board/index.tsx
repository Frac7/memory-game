import {
  Card as ChakraCard,
  CardBody,
  SimpleGrid,
  CardHeader,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useShallow } from "zustand/react/shallow";

import Card from "@/components/Card";
import useMemoryGameStore, {
  gameControllerSelector,
} from "@/store/useMemoryGameStore";
import useMemoryCardsStore, {
  cardsSelector,
} from "@/store/useMemoryCardsStore";
import useGameTimer from "@/hooks/useGameTimer";

const Board = () => {
  const { score, flips } = useMemoryGameStore(
    useShallow(gameControllerSelector)
  );
  const cards = useMemoryCardsStore(useShallow(cardsSelector));

  const { timer, startTimer, stopTimer } = useGameTimer();

  return (
    <ChakraCard variant="filled">
      <CardHeader>
        <Flex justifyContent="space-around">
          <Text>Score: {score}</Text>
          <Text>Flips: {flips}</Text>
          <Text>Timer: {timer}</Text>
          <Button onClick={stopTimer} rightIcon={<RepeatIcon />}>
            Restart
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          {cards.map(({ id, content }, i) => (
            <Card key={i} id={id} content={content} onClick={startTimer} />
          ))}
        </SimpleGrid>
      </CardBody>
    </ChakraCard>
  );
};

export default Board;
