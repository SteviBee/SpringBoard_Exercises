import React, { useState, useEffect, useRef } from "react";
import Card from "./Card"
import axios from "axios";

function Deck(){
    // Create State for deck
    const [deck, setDeck] = useState()
    const [card, setCard] = useState()
    
    const timerId = useRef(null);
    const [autoDraw, setAutoDraw] = useState(false);

    const BASE_URL = "http://deckofcardsapi.com/api/deck/new/"
    

    // onLoad API call
    useEffect(function callDeck() {
        // Get Deck
        async function fetchDeck() {
           const deckResult = await axios.get(BASE_URL)
           setDeck(deckResult.data.deck_id)     
        };
        fetchDeck()
    }, [setDeck]);

    // Display one card - AT START
    useEffect(function pickOneCard() {
        async function fetchCard() {
            if (deck !== undefined) {
                const cardResults = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
                setCard(cardResults.data.cards[0].image)     
            }

        };
        fetchCard()
    }, [deck]);

   
    // Adding all autodraw in one function - kinda wonder why not break out
    useEffect(function setCounter() {

        // Draw a card every second
        async function selectCard() {

            try {
            // Draw card part
            const cardResults = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    
            setCard(cardResults.data.cards[0].image)   
    
            // Alert if out of cards
            if (cardResults.data.remaining === 0) {
                setAutoDraw(false);
                alert("Error: No Cards remaining. Please refresh page")
            }
        } catch (err) {
            alert(err)
        }

        }

        // Calling the function every second:
        // #1 - DIDNT know async / await call this every second
        if (autoDraw && !timerId.current) {
            timerId.current = setInterval(async () => {
            //  Call card
            await selectCard()
            }, 1000);
        }

        // #2 - Didn't know to call clearInterval on TIC as well as put those three things
        // in the dependency array. Nor set TIC to null
        return function cleanUpClearTimer() {
        console.log("Unmount ID", timerId.current);
        clearInterval(timerId.current);
        timerId.current = null;
        };
    }, [autoDraw, setAutoDraw, deck]);

    // #3 didn't know to create toggle like this
    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto)
    }


    // Create event handler:
    // 5/19 notes - MOVE draw card back up here and set it up so I setCard
    // State and re-render every time but keep SAME access to deck state above. Added timer
    // so that when you click on the button, rather than drawing a single card, 
    // the page will draw one card every second.
    const handleDraw = evt => {
        async function fetchCard() {
        
            const cardResults = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
        
            setCard(cardResults.data.cards[0].image)   

            // Alert if out of cards
            if (cardResults.data.remaining === 0) {
                alert("Error: No Cards remaining. Please refresh page")
            }
         };
         fetchCard()
    }



    return (
        <div>            
            <Card data={card} handleDraw={handleDraw}/>
            <div>
                <h1>Start Timer:</h1>
                <button className="Deck" onClick={toggleAutoDraw}>
                    {autoDraw ? "STOP" : "KEEP"} DRAWING FOR ME
                </button>
             </div>
        </div>
    )

}



export default Deck;