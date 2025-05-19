let shuffledDeck = []
let baseDeck = []
let drawncards = 0
function shuffle(){
    shuffledDeck = []
    baseDeck =  ["A", "A", "A", "A", "K", "K", "K", "K", "Q", "Q", "Q", "Q", "J", "J", "J", "J", "T", "T", "T", "T", 9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2]
    let transferSlot = 0
    let x = 0
    for(let shuffled = 0; shuffled != 52; shuffled++){
        x = (Math.floor((Math.random)() * (baseDeck.length)))
        shuffledDeck[shuffledDeck.length] = baseDeck[x]
        transferSlot = baseDeck[baseDeck.length-1]
        baseDeck[baseDeck.length-1] = baseDeck[x]
        baseDeck[x] = transferSlot
        baseDeck.pop()
        drawncards = 0
    }
}
let cardValue = 0
function makevalue(Value){
    if (typeof(Value) == "number"){
        cardValue = Value
    }
    if (typeof(Value) == "string"){
        if (Value == "T" || Value == "J"|| Value == "Q" || Value == "K"){
            cardValue = 10
        }
        if (Value == "A"){
            cardValue = 11
        }
    }
}
function updatescreen(){
    console.clear()
    console.log(`Player Hand: ${playerHand}`)
    if (revealEverything == 0){
        console.log(`Dealer Hand: ${dealerHand[0]},X`)
    }
    if (revealEverything == 1){
        console.log(`DealerHand: ${dealerHand}`)
        console.log(`dealer's current value is: ${dealerValue}`)
    }
    console.log(`your current value is: ${playerValue}`)
    console.log("")
    console.log("")
    console.log(`Dealer Score:${dealerScore}`)
    console.log(`Player Score:${playerScore}`)
}
let playerHand = []
let dealerHand = []
let playerScore = 0
let dealerScore = 0
let dealerValue = 0
let playerValue = 0
let revealEverything = 0
let dealerAces = 0
let playerAces = 0
while(true){
    shuffle()
    revealEverything = 0
    drawncards = 0
    playerValue = 0
    dealerValue = 0
    dealerAces = 0
    playerAces = 0
    dealerHand = []
    playerHand = []
    playerHand[0] = shuffledDeck[drawncards]
    drawncards = drawncards + 1
    if(playerHand[0] == "A"){
        playerAces = playerAces + 1
    }
    dealerHand[0] = shuffledDeck[drawncards]
    if(dealerHand[0] == "A"){
        dealerAces = dealerAces + 1
    }
    drawncards = drawncards + 1
    playerHand[1] = shuffledDeck[drawncards]
    if(playerHand[1] == "A"){
        playerAces = playerAces + 1
    }
    drawncards = drawncards + 1
    dealerHand[1] = shuffledDeck[drawncards]
    if(dealerHand[1] == "A"){
        dealerAces = dealerAces + 1
    }
    drawncards = drawncards + 1
    makevalue(playerHand[0])
    playerValue = playerValue + cardValue
    makevalue(playerHand[1])
    playerValue = playerValue + cardValue
    makevalue(dealerHand[0])
    dealerValue = dealerValue + cardValue
    makevalue(dealerHand[1])
    dealerValue = dealerValue + cardValue
    updatescreen()
    let hit = prompt("hit or stand")
    hit = hit.toLowerCase()
    let playerdrawn = 2
    let dealerdrawn = 2
    while((hit == "hit") && (playerValue < 21)){
        playerHand[playerdrawn] = shuffledDeck[drawncards]
        if(playerHand[playerdrawn] == "A"){
            playerAces = playerAces + 1
        }
        makevalue(playerHand[playerdrawn])
        playerValue = playerValue + cardValue
        playerdrawn = playerdrawn + 1
        drawncards = drawncards + 1
        if((playerValue > 21) && (playerAces > 0)){
            playerAces = playerAces - 1
            playerValue = playerValue - 10
        }
        updatescreen()
        if (playerValue <= 21){
            hit = prompt("hit or stand")
            hit = hit.toLowerCase()
        }
    }
    if (playerValue > 21){
        console.clear()
        console.log(`BUST!!!`)
        dealerScore = dealerScore + 1
        alert("you lose (bust)")
        continue
    } else{
        while(dealerValue < 18){
            dealerHand[dealerdrawn] = shuffledDeck[drawncards]
            if(dealerHand[dealerdrawn] == "A"){
                dealerAces = dealerAces + 1
            }
            makevalue(dealerHand[dealerdrawn])
            dealerValue = dealerValue + cardValue
            dealerdrawn = dealerdrawn + 1
            drawncards = drawncards + 1
            revealEverything = 1
            if ((dealerValue > 21) && (dealerAces > 0)){
                dealerValue = dealerValue - 10
                dealerAces = dealerAces - 1
            }
        }
        revealEverything = 1
        updatescreen()
        if(dealerValue > 21){
            alert("you win (dealer busts)");
            playerScore = playerScore + 1
        } else if (playerValue == dealerValue){
            alert("tie (equal value)");
        } else if(dealerValue > playerValue){
            alert("you lose (by value)");
            dealerScore = dealerScore + 1
        } else if(playerValue > dealerValue){
            alert("you win (by value)");
            playerScore = playerScore + 1
        }
        updatescreen()
        if (playerScore == 5){
            alert("you win")
            break
        }
        if (dealerScore == 5){
            alert("you suck at luck")
            break
        }
    }
}