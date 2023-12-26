import {
  Card as ChakraCard,
  CardBody,
  SimpleGrid,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useShallow } from "zustand/react/shallow";

import Card from "@/components/Card";
import useMemoryGameStore, {
  gameControllerSelector,
} from "@/store/useMemoryGameStore";
import useMemoryCardsStore, {
  cardsSelector,
} from "@/store/useMemoryCardsStore";

import Timer from "../Timer";

const Board = () => {
  const { score, flips, handleFlip } = useMemoryGameStore(
    useShallow(gameControllerSelector)
  );
  const cards = useMemoryCardsStore(useShallow(cardsSelector));

  return (
    <ChakraCard variant="filled">
      <CardHeader>
        <Flex justifyContent="space-around">
          <Text>Score: {score}</Text>
          <Text>Flips: {flips}</Text>
          <Timer />
        </Flex>
      </CardHeader>
      <CardBody>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          {cards.map((card, i) => (
            <Card key={i} onClick={() => handleFlip(i)} {...card} />
          ))}
        </SimpleGrid>
      </CardBody>
    </ChakraCard>
  );
};

export default Board;
