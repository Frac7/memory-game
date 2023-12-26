const getCard = async (id: number) => {
  const stream = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const response = await stream.json();
  return {
    id: response.id,
    content: response.sprites?.other?.dream_world?.front_default,
  };
};

export const getCards = async () => {
  const cards = [];
  const indexes = Array(5)
    .fill(0)
    .map((_, i) => i * 3 + 2);
  for (const i of indexes) {
    const card = await getCard(i);
    cards.push(card);
  }
  return cards;
};
