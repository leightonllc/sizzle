let $card = document.getElementsByClassName("card");
let $input = document.getElementsByClassName("input");
let $enter = document.getElementsByClassName("enter");
let answer = ["1", "2", "3", "4", "5", "6"];



let arr = [];
let m = 0, n = 0;

var inputmouseclick = function() {
    var attribute = this.innerHTML;
	if (arr.length < 6) {
		arr.push(attribute);
		$card[m * 6 + n].innerHTML = attribute;
		n++;
	}
    //alert(arr);
};

var entermouseclick = function() {
    for (var i = 0; i < 6; i++){
		if (answer[i] == $card[m * 6 + i].innerHTML) {
			$card[m * 6 + i].classList.add("card-green");
		} else 
			if (answer.includes($card[m * 6 + i].innerHTML)) {
				$card[m * 6 + i].classList.add("card-red");
			} else {
				$card[m * 6 + i].classList.add("card-black");
			}
		//alert(answer.includes($card[m * 6 + i].innerHTML));
		
	}
	m++;
	n = 0;
	arr = [];
    
};

for (var i = 0; i < $input.length; i++) {
    $input[i].addEventListener('click', inputmouseclick, false);
}

$enter[0].addEventListener('click', entermouseclick, false);