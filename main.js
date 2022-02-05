Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();
  
	return [this.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
		   ].join('');
  };
  
var date = new Date();


let $gamebox = document.getElementsByClassName("gamebox");
let $input = document.getElementsByClassName("input");
let $enter = document.getElementsByClassName("enter");
let $backspace = document.getElementsByClassName("backspace");
let random = new Math.seedrandom(date.yyyymmdd());
let $answer = document.getElementsByClassName("answer");


let answer = [];

for (var i = 0; i < 6; i++) {
	answer.push(String(Math.round(random() * 48 + 1)));
	while (checkForDuplicates(answer)) {
		answer.pop();
		answer.push(String(Math.round(random() * 48 + 1)));
	}
}
numberSort = function (a,b) {
	if (parseInt(a) > parseInt(b)) return 1;
	if (parseInt(a) < parseInt(b)) return -1;
	return 0;
};
answer.sort(numberSort);
alert("測試：答案爲 " + answer);



let arr = [];
let m = 0, n = 0;

var inputmouseclick = function() {
    var attribute = this.innerHTML;
	if (arr.length < 6) {
		arr.push(attribute);
		$gamebox[m * 6 + n].innerHTML = attribute;
		if (n < 6) n++;
	}
    //alert(arr);
};

function countwin(){
	let count = 0;
	for (var i = 0; i < 6; i++){
		$answer[i].innerHTML = answer[i];
		if (answer.includes($gamebox[m * 6 + i].innerHTML)) count++;
		document.getElementById("correctcount").innerHTML = count;
	}
	document.getElementsByClassName("modal")[1].classList.remove("hide");
	document.getElementsByClassName("modal")[1].classList.add("show");

}

var entermouseclick = function() {
	if (arr.length < 6) {
		alertbar("六粒呀！使唔使哥哥陪你逐隻手指數？", 'danger');
		return;
	}
	if (checkForDuplicates(arr)) {
		alertbar("諗住買重複冧巴贏面大啲？", 'danger');
		return;
	}
	if (!sorted(arr)) {
		alertbar("喂你識唔識架？六合彩由細至大入㗎喎！", 'danger');
		return;
	}
    for (var i = 0; i < 6; i++){
		if (answer[i] == $gamebox[m * 6 + i].innerHTML) {
			$gamebox[m * 6 + i].classList.add("card-green");
			$input[$gamebox[m * 6 + i].innerHTML - 1].classList.add("card-green");
		} else 
			if (answer.includes($gamebox[m * 6 + i].innerHTML)) {
				$gamebox[m * 6 + i].classList.add("card-red");
				$input[$gamebox[m * 6 + i].innerHTML - 1].classList.add("card-red");
			} else {
				$gamebox[m * 6 + i].classList.add("card-black");
				$input[$gamebox[m * 6 + i].innerHTML - 1].classList.add("card-black");
			}
		//alert(answer.includes($gamebox[m * 6 + i].innerHTML));
		
	}
	if (m == 5) {
		countwin();
		return;
	}
	if (m < 6) m++;
	n = 0;
	arr = [];
    
};

function sorted(array){
    let second_index;
	for(let first_index = 0; first_index < array.length; first_index++){
  	  second_index = first_index + 1;
      if(array[second_index] - array[first_index] < 0) return false;
    }
    return true;
}

function checkForDuplicates(array) {
	return new Set(array).size !== array.length
  }

var modalclose = function() {
	document.getElementsByClassName("modal")[0].classList.remove("show");
	document.getElementsByClassName("modal")[0].classList.add("fade");
}

var backspacemouseclick = function() {
    if (arr.length > 0) {
		arr.pop();
		$gamebox[m * 6 + n - 1].innerHTML = "&nbsp;&nbsp;";
		if (n > 0) n--;
	}
};

for (var i = 0; i < $input.length; i++) {
    $input[i].addEventListener('click', inputmouseclick, false);
}

$enter[0].addEventListener('click', entermouseclick, false);

$backspace[0].addEventListener('click', backspacemouseclick, false);

document.getElementsByClassName("closemodal")[0].addEventListener('click', modalclose, false);

function alertbar(message, type) {
	var wrapper = document.createElement('div')
	wrapper.innerHTML = '<div id="alert" class="container alert alert-dismissible alert-' + type + ' role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
	document.getElementsByTagName("div")[0].append(wrapper);
}