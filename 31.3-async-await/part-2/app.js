let $h2 = $("h2")
let baseURL = "http://deckofcardsapi.com/api/deck/new/draw/";


// 1:
let count = "count=1"
async function getCard() {
  
  await $.getJSON(`${baseURL}?${count}`).then(data => {
    console.log(data.cards[0].value, data.cards[0].suit)
  })

}
getCard()

// // 2
async function appendCard() {
  
  await $.getJSON(`${baseURL}?${count}`)
  .then(data => {
    console.log(data.cards[0].value, data.cards[0].suit)
    return $.getJSON(`${baseURL}?${count}`)
  })
  .then(data => {
    let deck = data.deck_id
    $.getJSON(`http://deckofcardsapi.com/api/deck/${deck}/draw/?${count}`)
    console.log(data.cards[0].value, data.cards[0].suit)
  })
  .catch(err => {
    console.log('Opps, there was an error!', err)
  })
}

appendCard()

// // 3

// Load deck
let d_id = ''

async function setDeck() {
  
$( document ).ready(function() {
  $.getJSON(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(
    data => {
    
      d_id = d_id.concat(data.deck_id)
      console.log('deck -', d_id)
      return d_id
  })
});
} 
// Display cards

async function postDeck() {
  
$('button').on('click', function () {
  console.log("clicked!")
  
  $.getJSON(`http://deckofcardsapi.com/api/deck/${d_id}/draw/?count=1`)

    .then(data => {
      if (data.remaining > 1) {
  
      $("h2").append(`<p>${data.cards[0].value} of ${data.cards[0].suit}`)
      $("h2").append(`<img src=${data.cards[0].image}>`)

      return $.getJSON(`${baseURL}?${count}`)
      } else {
        $("h2").empty()
        $("h2").append(`<h2>DECK IS DONE</h2>`)
      }
    })
    .catch(err => {
      console.log('Opps, there was an error!', err)
    })
  })
}

setDeck()
postDeck()