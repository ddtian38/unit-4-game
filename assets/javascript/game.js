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


$(document).ready(function(){

    $('#rex .hit-points').text(characters["Captain Rex"].hitPoints);
    $('#cody .hit-points').text(characters["Commander Cody"].hitPoints);
    $('#krell .hit-points').text(characters["General Krell"].hitPoints);
    $('#grevious .hit-points').text(characters["General Grevious"].hitPoints);

    console.log("Running program");


$(".hostile").on("click", function(){
        console.log("adding hostile")
        $(this).addClass("hostile-selected");
       var enemy =  $(this).detach();
       enemy.appendTo($('.defender'));
    
    });



$(".friendly").on("click", function(){
    console.log("x");
    var charcList = $('.friendly');
    console.log(charcList);
    $(this).addClass("friendly-selected");
    for (var i = 0; i < charcList.length; i++){
        console.log("xxx");
        if(!(charcList.eq(i).hasClass("friendly-selected"))){
            charcList.eq(i).removeClass("friendly").addClass("hostile");
            var detach = charcList.eq(i).detach();
            detach.appendTo($('.enemies'));
        }
    }
});






$("button").on("click", function(){

    var p1 = $("<p>").text("You attacked " + $(".hostile-selected .name").text() + " for " + characters[$(".friendly-selected .name").text()].attack +  "damage.");
    var p2 = $("<p>").text($(".hostile-selected .name").text()+ " attacked you back" +  + " for " + characters[$(".hostile-selected .name").text()].attack + "damage.");
    p1.appendTo($(".attack-status"));
    p2.appendTo($(".attack-status"));
    var attackStatusExist = 

})




});