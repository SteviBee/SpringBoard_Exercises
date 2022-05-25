import React from "react";
// import uuid from "uuid";
// import axios from "axios";
import PlayingCard from "./PlayingCard";
import useAxios from "./hooks/useAxios";

import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {

  // OLD NON-custom hook code
  // const [cards, setCards] = useState([]);
  // const addCard = async () => {
  //   const response = await axios.get(
  //     "https://deckofcardsapi.com/api/deck/new/draw/"
  //   );
  //   setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  // };

  // Custom hook code:
  // Create URL, make custom call, return data needed
  const url = "https://deckofcardsapi.com/api/deck/new/draw/"
  const data = useAxios(url)
  if (data.isLoading) {
    return <div>Loading...</div>;
  }
  
  const [cards, addCard ] = data 

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.cards[0].image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
