let $card = document.getElementsByClassName("card");
let $keyboard = document.getElementsByClassName("keyboard");
var elements = document.getElementsByClassName("classname");

var mouseclick = function() {
    var attribute = this.innerHTML;
    alert(attribute);
};

for (var i = 0; i < $keyboard.length; i++) {
    $keyboard[i].addEventListener('click', mouseclick, false);
}