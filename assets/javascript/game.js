//Creating characters object
var characters = { player1: {name: "Captain Rex",
                        attack: 20,
                        hitPoints: 130,
                        counterAttack: 20
                },
                player2: {name: "Commander Cody",
                    attack: 12,
                    hitPoints: 130,
                    counterAttack: 20

                },  

                player3: {name: "General Krell",
                    attack: 14,
                    hitPoints: 130,
                    counterAttack: 20
                },
                player4: { name: "General Grevious",
                    attack: 16,
                    hitPoints: 130,
                    counterAttack: 20
                }
}
//Declaring and initializing global variables
var hero, villian, heroAttack = 0, villianAttack = 0;
var heroDead = false;
var villianDead = false;
var thereIsVillian = true;;
var charcList = $('.friendly');

//Setting up names and hitpoints on html file
$('#rex .name').text(characters.player1.name);
$('#cody .name').text(characters.player2.name);
$('#krell .name').text(characters.player3.name);
$('#grevious .name').text(characters.player4.name);

$('#rex .hit-points').text(characters.player1.hitPoints);
$('#cody .hit-points').text(characters.player2.hitPoints);
$('#krell .hit-points').text(characters.player3.hitPoints);
$('#grevious .hit-points').text(characters.player4.hitPoints);

//Function chooses heroes and enemies for the game
function choosingHeroAndEnemies(){
    $(".characters h4").text("YOUR CHARACTER");
    $(this).addClass("hero");
    choosingEnemies();
}

//Function chooses enemies
function choosingEnemies(){
    for (var i = 0; i < charcList.length; i++){
        if(!(charcList.eq(i).hasClass("hero"))){
            var enemy = charcList.eq(i).removeClass("friendly").addClass("hostile").detach();
            enemy.appendTo($('.enemies'));
        }
    }
}

//Function chooses villian out of list of enemies
function chooseVillian(){
        $(this).addClass("villian");
        var defender =  $(this).detach();
        defender.appendTo($('.defender'));
 };

//Function runs the game
 function runGame(){

    //Checks if a villian is selected
    thereIsVillian = ($(".villian").length > 0);
    
    //If villian exists, hero can attack villian.
    if(thereIsVillian){
      //Increase hero's attack point and villian's counter attack points based on their stats in the object.
      heroAttack += hero.attack;
      villianAttack = villian.counterAttack;
      //Display the stats.
      $("#attack-status").text("You attacked " + $(".villian .name").text() + " for " + heroAttack +  " damage. "  +  $(".villian .name").text()+ " attacked you back" + " for " + villianAttack + " damage.");
      //Subtract the hero/villian hit points from attack/counterattack points and display on HTML file.
      hero.hitPoints -= villianAttack;
      villian.hitPoints -= heroAttack;
      $('.hero .hit-points').text(hero.hitPoints);
      $('.villian .hit-points').text(villian.hitPoints);
      //Checks to see if the villian or hero is dead
      villianDead = (villian.hitPoints <= 0);
      heroDead = (hero.hitPoints <= 0);
  
     //If hero is dead, the reset button is displayed and all other events are disabled.
      if(heroDead){
          $("#attack-status").text("Game over. Reset to play.")
          $("#attack-status").append($("<br><button class=\"reset btn btn-dark\"> Reset </button>"));
            $(document).off("click", ".friendly", choosingHeroAndEnemies);
            $(document).off("click", ".hostile", chooseVillian);
            $(document).off("click", "#attack", runGame);
      }
      //If the villian dies, player can select the next enemy to fight.
        if(villianDead && !heroDead){
            heroAttack += hero.attack;
            villianAttack = 0;
            $("#attack-status").text("Congratulations! " + $(".villian .name").text() + " has been defeated. Select another enemy fight.")
            $(".defender").empty();
            
        }
      }
      //If villian is not present, player needs to select one from the enemy
      else{
          $("#attack-status").text("No enemy is here. Please select an enemy.");
      }
  }


$(document).ready(function(){

    
    $(document).on("click", ".friendly", choosingHeroAndEnemies);

    $(document).on("click", ".hostile", chooseVillian);

    $(document).on("click", "#attack", runGame);

    $(document).on("click", ".reset", function(){
        location.reload();
    })

    console.log($(".characters h4"));

});