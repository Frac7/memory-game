import { FC } from "react";
import { CardBody, Card as ChakraCard, Box } from "@chakra-ui/react";

import { Card as CardInterface } from "@/store/types";

interface CardProps extends CardInterface {
  onClick: () => void;
}

const Card: FC<CardProps> = ({ id, content, flipped, disabled, onClick }) => {
  return (
    <ChakraCard
      style={{
        width: "100px",
        height: "200px",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.25)",
        visibility: disabled ? "none" : "visible",
      }}
    >
      <CardBody style={{ display: "flex" }}>
        <Box
          style={{ cursor: "pointer", width: "100px", height: "200px" }}
          onClick={onClick}
        >
          {flipped && <img width="100" alt={id.toString()} src={content} />}
        </Box>
      </CardBody>
    </ChakraCard>
  );
};

export default Card;
