class Card {
    constructor(v, s){
        this.suit = s
        this.value = v
    }
    showCard(){
        console.log(`${this.getStringName(this.value) || this.value} of ${this.suit}`)
    }
    getStringName(val){
        const helper = {
            1: 'Ace',
            11: 'Jack',
            12: 'Queen',
            13: 'King'
        }
        return helper[val]
    }
}

class Deck {
    constructor(){
        this.cards = new Array()
        
        this.fillDeck()
    }
    fillDeck(){
        const suits = ['s', 'h', 'c', 'd']
        const values = ['A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K']
        for(let suit of suits){
            for(let value of values){
                let c = new Card(value, suit,)
                this.cards.push(c)
            }
        }
    }
    shuffle(){
        for(let idx = 0; idx < this.cards.length; idx++){
            let randomPos = Math.floor(Math.random() * 10) + 1
            let temp = this.cards[idx]
            this.cards[idx] = this.cards[randomPos]
            this.cards[randomPos] = temp   
        }
    }
    deal(n){
        return this.cards.splice(0, n)
    }
}


let gameDeck;

let playerHand;
    
let dealerHand;

let psum;

let dsum;

$('#hold').hide()

$('#hit').hide()

function init(){

    psum = 0;

    dsum = 0;

    gameDeck = new Deck()
    
    gameDeck.shuffle()

    playerHand = gameDeck.deal(2)
    
    dealerHand = gameDeck.deal(2)

    for(let card of playerHand){
    const newEl = $(`<div class="card xlarge ${card.suit}${card.value}"></div>`)
    $('#player-cards').append(newEl)
    }
        
    for(let card of dealerHand){
    const newEl = $(`<div class="card xlarge ${card.suit}${card.value}"></div>`)
    $('#dealer-cards').append(newEl)
    }

    
    $('#game-status').html('Player goes first')

    $('#hold').show()

    $('#hit').show()

    AddAndRender()
    initBjCheck()
}

function AddAndRender(){
    for (let card of playerHand){
        if (card.value == 'A'){
          if(psum < 11){
              card.scores = 11
          }
          else{
              card.scores = 1
          }
        }
        else if (card.value == 'K'){
          card.scores = 10
        }
        else if (card.value == 'Q'){
          card.scores = 10
        }
        else if (card.value == 'J'){
          card.scores = 10
        }
        else{
            card.scores = parseInt(card.value)
        }
        psum += card.scores
    }
    for (let card of dealerHand){
        card.scores = parseInt(card.value)
        if (card.value == 'A'){
            if(dsum < 11){
                card.scores = 11
            }
            else{
                card.scores = 1
            }
        }
        else if (card.value == 'K'){
            card.scores = 10
          }
          else if (card.value == 'Q'){
            card.scores = 10
          }
          else if (card.value == 'J'){
            card.scores = 10
          }
          else{
              card.scores = parseInt(card.value)
          }
          dsum += card.scores
    }
     $('#dealer-score').html(dsum)
     $('#player-score').html(psum)
}

function initBjCheck(){
    if (psum == 21){
        $('#player-score').html('Black Jack!')
        $('#game-status').html('Player has won!')
        $('#hit').hide()
        $('#hold').hide()
     }
     else if (dsum == 21){
        $('#dealer-score').html('Black Jack!')
        $('#game-status').html('Dealer has won!')
        $('#hit').hide()
        $('#hold').hide()
     }
     else if (psum == 21 && dsum == 21){
        $('#game-status').html('It\'s a tie!')
     }
}

$('#hit').click(function(){
    playerHand = gameDeck.deal(1)
    for(let card of playerHand){
        const newEl = $(`<div class="card xlarge ${card.suit}${card.value}"></div>`)
        $('#player-cards').append(newEl)
    }
    for (let card of playerHand){
        card.scores = parseInt(card.value)
        if (card.value == 'A'){
            if(dsum < 11){
                card.scores = 11
            }
            else{
                card.scores = 1
            }
        }
        else if (card.value == 'K'){
            card.scores = 10
          }
          else if (card.value == 'Q'){
            card.scores = 10
          }
          else if (card.value == 'J'){
            card.scores = 10
          }
          else{
              card.scores = parseInt(card.value)
          }
          psum += card.scores
    }
    $('#player-score').html(psum)
    if(psum > 21){
     $('#game-status').html('Dealer won, Player BUST!')
     $('#hit').hide()
     $('#hold').hide()
     $('#start').html('Play again')
    }
})

$('#hold').click(function(){
    if (dsum < 17) {
        dealerHand = gameDeck.deal(1)
        for(let card of dealerHand){
        const newEl = $(`<div class="card xlarge ${card.suit}${card.value}"></div>`)
        $('#dealer-cards').append(newEl)
        }
        for (let card of dealerHand){
            card.scores = parseInt(card.value)
            if (card.value == 'A'){
                if(dsum < 11){
                    card.scores = 11
                }
                else{
                    card.scores = 1
                }
            }
            else if (card.value == 'K'){
                card.scores = 10
              }
              else if (card.value == 'Q'){
                card.scores = 10
              }
              else if (card.value == 'J'){
                card.scores = 10
              }
              else{
                  card.scores = parseInt(card.value)
              }
              dsum += card.scores
        }
    }
    $('#dealer-score').html(dsum)
    if (dsum < 17) {
        dealerHand = gameDeck.deal(1)
        for(let card of dealerHand){
        const newEl = $(`<div class="card xlarge ${card.suit}${card.value}"></div>`)
        $('#dealer-cards').append(newEl)
        }
        for (let card of dealerHand){
            card.scores = parseInt(card.value)
            if (card.value == 'A'){
                if(dsum < 11){
                    card.scores = 11
                }
                else{
                    card.scores = 1
                }
            }
            else if (card.value == 'K'){
                card.scores = 10
              }
              else if (card.value == 'Q'){
                card.scores = 10
              }
              else if (card.value == 'J'){
                card.scores = 10
              }
              else{
                  card.scores = parseInt(card.value)
              }
              dsum += card.scores
        }
    }
    $('#dealer-score').html(dsum)
    checkWin()
})

function checkWin(){
    if(psum == dsum){
        $('#game-status').html('It\'s a tie!')
        $('#hit').hide()
        $('#hold').hide()
    }
    else if(dsum > 21){
        $('#game-status').html('Player won, Dealer BUST!')
        $('#hit').hide()
        $('#hold').hide()
    }
    else if(psum > dsum){
        $('#game-status').html('Player has won!')
        $('#hit').hide()
        $('#hold').hide()
    }
    else if(dsum > psum){
        $('#game-status').html('Dealer has won!')
        $('#hit').hide()
        $('#hold').hide()
    }
    $('#start').html('Play again')
}

$('#start').click(function(){
    $('#dealer-cards').empty()
    $('#player-cards').empty()
    $('#dealer-score').html('')
    $('#player-score').html('')
    $('#hit').show()
    $('#hold').show()
    init()
})