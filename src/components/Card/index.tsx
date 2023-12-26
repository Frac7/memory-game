import { FC } from "react";
import { CardBody, Card as ChakraCard } from "@chakra-ui/react";

import { Card as CardInterface } from "@/store/types";

interface CardProps extends CardInterface {
  onClick: () => void;
}

const Card: FC<CardProps> = ({ id, content, onClick }) => {
  return (
    <ChakraCard
      style={{
        maxWidth: "150px",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.25)",
      }}
    >
      <CardBody style={{ display: "flex" }}>
        <img
          style={{ cursor: "pointer" }}
          onClick={onClick}
          alt={id.toString()}
          src={content}
        />
      </CardBody>
    </ChakraCard>
  );
};

export default Card;
