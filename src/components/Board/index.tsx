import { Card as ChakraCard, CardBody, SimpleGrid } from "@chakra-ui/react";
import Card from "@/components/Card";

const Board = () => {
  return (
    <ChakraCard variant="filled">
      <CardBody>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
        >
          <Card content="Content 1" />
          <Card content="Content 2" />
          <Card content="Content 3" />
          <Card content="Content 4" />
          <Card content="Content 5" />
          <Card content="Content 6" />
          <Card content="Content 7" />
          <Card content="Content 8" />
          <Card content="Content 9" />
          <Card content="Content 10" />
        </SimpleGrid>
      </CardBody>
    </ChakraCard>
  );
};

export default Board;
