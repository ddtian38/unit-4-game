

var characters = { "Captain Rex": {attack: 20,
                        hitPoints: 100
                },
                "Commander Cody": {attack: 40,
                    hitPoints: 125

                },

                "General Krell": {attack: 30,
                    hitPoints: 130
                },
                "General Grevious": {attack: 45,
                    hitPoints: 140
                    
                }
}
var heroDead = false;
var villianDead = false;
var thereIsVillian = true;
var charcList = $('.friendly');

$('#rex .hit-points').text(characters["Captain Rex"].hitPoints);
$('#cody .hit-points').text(characters["Commander Cody"].hitPoints);
$('#krell .hit-points').text(characters["General Krell"].hitPoints);
$('#grevious .hit-points').text(characters["General Grevious"].hitPoints);

function choosingHeroAndEnemies(){
    $(this).addClass("hero");
    choosingEnemies();
}

function choosingEnemies(){
    for (var i = 0; i < charcList.length; i++){
        if(!(charcList.eq(i).hasClass("hero"))){
            var enemy = charcList.eq(i).removeClass("friendly").addClass("hostile").detach();
            enemy.appendTo($('.enemies'));
        }
    }
}
function chooseVillian () {
    $(this).addClass("villian");
    var defender =  $(this).detach();
    defender.appendTo($('.defender'));
 };

 function runGame(){
    thereIsVillian = ($(".villian").length > 0);
    var hero = characters[$(".hero .name").text()];
    var villian =  characters[$(".villian .name").text()];
    
    if(thereIsVillian){
      var heroAttack = hero["attack"];
      var villianAttack = villian["attack"];
      console.log(villianAttack);
      $("#attack-status").text("You attacked " + $(".villian .name").text() + " for " + heroAttack +  " damage. "  +  $(".villian .name").text()+ " attacked you back" + " for " + villianAttack + " damage.");
      hero.hitPoints -= villianAttack;
      villian.hitPoints -= heroAttack;
      $('.hero .hit-points').text(hero.hitPoints);
      $('.villian .hit-points').text(villian.hitPoints);
      villianDead = (villian.hitPoints <= 0);
      heroDead = (hero.hitPoints <= 0);
  
      if(heroDead){
          $("#attack-status").text("Game over. Reset to play.")
          $("#attack-status").append($("<button class=\"reset\"> Reset </button>"));
        $(document).off("click", ".friendly", choosingHeroAndEnemies);
        $(document).off("click", ".hostile", chooseVillian);
        $(document).off("click", "#attack", runGame);
      }
        if(villianDead){
            $(".defender").empty();
            $("#attack-status").text("Congratlations! " + villian + " has been defeated. Select another enemy fight.")
        }
      }
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




});