$(document).ready(function() {

    //what does this do?
    var convert_value_to_string = function(value) {
        if (value > 10) {
            switch (value) {
                case 11:
                    return 'Jack';
                    break;
                case 12:
                    return 'Queen';
                    break;
                case 13:
                    return 'King';
                    break;
            }
        }
        return value.toString();
    }

    //what does this do?
    var deck = [];
    var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    for (var i = 0; i < suits.length; i++) {
        var suit = suits[i];
        for (var j = 0; j < 13; j++) {
            deck.push({
                number: j + 1,
                suit: suit
            });
        }
    }

    //what does this do?
    var shuffle = function(array) {
        var copy = [];
        var n = array.length;
        var i;
        while (n) {
            i = Math.floor(Math.random() * array.length);
            if (i in array) {
                copy.push(array[i]);
                delete array[i];
                n--;
            }
        }
        return copy;
    }

    //Now call the shuffle function and save the result of what shuffle returns into your deck variable

    var cards_player_1 = [];
    var cards_player_2 = [];
    deck = shuffle(deck);


    // write a function called deal that will evently divide the deck up between the two players
    var deal = function(deck) {
        for (var i = 0; i < deck.length; i++)
            if (i % 2 === 0) {
                cards_player_1.push(deck[i]);
            } else {
                cards_player_2.push(deck[i]);

            }

    };
    deal(deck);
    //create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. 
    //A tie should return false.
    var war = function(card1, card2) {
        console.log(card1, card2);
        if (card1 > card2) {
            return "Player1 Wins";
        } else if (card1 < card2) {
            return "Player2 Wins";
        } else {
            return false;
        }
    };


    var advance = function() {
        //take the top two cards and display them
        if (cards_player_1.length) {
            var card_1 = cards_player_1[0];
            var card_2 = cards_player_2[0];
            $("#opp-card").html(convert_value_to_string(card_1.number) + " " + card_1.suit);
            $("#opp-card-count").html(cards_player_1.length);
            $("#my-card").html(convert_value_to_string(card_2.number) + " " + card_2.suit);
            $("#my-card-count").html(cards_player_2.length);

        }
    }


    //create a play function
    //compare the cards//give the winner both cards (at end of deck)

    var distributeSpoils = function(result, spoils) {
        if (result === "Player1 Wins") {
            spoils.forEach(function(itemInArray) {
                cards_player_1.push(itemInArray);
            });
        } else if (result === "Player2 Wins") {
            spoils.forEach(function(itemInArray) {
                cards_player_2.push(itemInArray);
            });
        } else {
            var p1CardOffs = cards_player_1.splice(0, 4);
            var p2CardOffs = cards_player_2.splice(0, 4);


            var battleOff = war(p1CardOffs[p1CardOffs.length - 1].number, p2CardOffs[p2CardOffs.length - 1].number);

            p2CardOffs.forEach(function(p2Card) {
                p1CardOffs.push(p2Card);
            });
            spoils.forEach(function(spoil) {
                p1CardOffs.push(spoil);
            });

            distributeSpoils(battleOff, p1CardOffs);
        }
    }

    var play = function() {
        var card1 = cards_player_1.shift();
        var card2 = cards_player_2.shift();
        var battle = war(card1.number, card2.number);

        distributeSpoils(battle, [card1, card2]);

        //this function (defined below) will continue to the next turn
        advance();
    }




    advance();

    $(".btn").click(function() {
        play();
    });
});
