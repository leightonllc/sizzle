Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();
  
	return [this.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
		   ].join('');
  };
  
var date = new Date();

if (!(date.yyyymmdd() == localStorage.getItem("lastdate"))) {
	localStorage.clear();
}

let $gamebox = document.getElementsByClassName("gamebox");
let $input = document.getElementsByClassName("input");
let $enter = document.getElementsByClassName("enter");
let $backspace = document.getElementsByClassName("backspace");
let random = new Math.seedrandom(date.yyyymmdd());
let $answer = document.getElementsByClassName("answer");
let $attempt = document.getElementsByClassName("attempt");
let $container = document.getElementsByClassName("container-fluid");
let answer = [];

for (var i = 0; i < 6; i++) {
	answer.push(String(Math.round(random() * 48 + 1)));
	while (checkForDuplicates(answer)) {
		answer.pop();
		answer.push(String(Math.round(random() * 48 + 1)));
	}
}

let specialnum = String(Math.round(random() * 48 + 1));
while (answer.includes(specialnum)) {
	specialnum = String(Math.round(random() * 48 + 1));
}

numberSort = function (a,b) {
	if (parseInt(a) > parseInt(b)) return 1;
	if (parseInt(a) < parseInt(b)) return -1;
	return 0;
};
answer.sort(numberSort);


let arr = [];
let m = 0;
if (localStorage.getItem("m")) m = localStorage.getItem("m");
let n = 0;
let saver = [];
if (localStorage.getItem("saver")) saver = JSON.parse(localStorage.getItem("saver"));
let sharetext = "";
if (localStorage.getItem("sharetext")) sharetext = localStorage.getItem("sharetext");
let gamedone = false;
if (localStorage.getItem("gamedone")) gamedone = localStorage.getItem("gamedone");

if (m > 0) {
	for (var i = 0; i < m; i++) {
		for (var j = 0; j < 6; j++) {
			$gamebox[i * 6 + j].innerHTML = saver[i * 6 + j];
			if (answer[j] == $gamebox[i * 6 + j].innerHTML) {
				$gamebox[i * 6 + j].classList.add("card-green");
				$input[$gamebox[i * 6 + j].innerHTML - 1].classList.add("card-green");
			} else if (answer.includes($gamebox[i * 6 + j].innerHTML)) {
				$gamebox[i * 6 + j].classList.add("card-red");
				$input[$gamebox[i * 6 + j].innerHTML - 1].classList.add("card-red");
			} else {
				$gamebox[i * 6 + j].classList.add("card-black");
				$input[$gamebox[i * 6 + j].innerHTML - 1].classList.add("card-black");
			}
		}
	}
}

if (gamedone) {
	document.getElementsByClassName("modal")[0].classList.remove("show");
	document.getElementsByClassName("modal")[0].classList.add("fade");
	$container[0].classList.remove("blur");
	$container[1].classList.remove("blur");
	$container[2].classList.remove("blur");
	countwin();
}

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
	if (m == 0) m++;
	for (var i = 0; i < 6; i++){
		$answer[i].innerHTML = answer[i];
		$attempt[i].innerHTML = $gamebox[(m-1) * 6 + i].innerHTML;
		if (answer[i] == $gamebox[(m-1) * 6 + i].innerHTML) {
			$attempt[i].classList.add("card-green");
		} else if (answer.includes($gamebox[(m-1) * 6 + i].innerHTML)) {
			$attempt[i].classList.add("card-red");
		} else {
			$attempt[i].classList.add("card-black");
		}
		if (answer.includes($gamebox[(m-1) * 6 + i].innerHTML)) count++;
		document.getElementById("correctcount").innerHTML = count;
	}
	if (m == 1) m--;
	document.getElementById("specialnumber").innerHTML = specialnum;
	document.getElementsByClassName("modal")[1].classList.remove("hide");
	document.getElementsByClassName("modal")[1].classList.add("show");
	if (count == 6){
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中頭獎架啦！"
	} else if (count == 5 && arr.includes(specialnum)) {
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中二獎架啦！"
	} else if (count == 5) {
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中三獎架啦！"
	} else if (count == 4 && arr.includes(specialnum)) {
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中四獎架啦！"
	} else if (count == 4) {
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中五獎架啦！"
	} else if (count == 3 && arr.includes(specialnum)) {
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中六獎架啦！"
	} else if (count == 3) {
		document.getElementById("awardtext").innerHTML = "嘩黐線架！你真係去買就中七獎架啦！"
	} else {
		document.getElementById("awardtext").innerHTML = "雖然咩獎都唔會有但係旨在開心嘅啫。"
	}
	$container[0].classList.add("blur");
	$container[1].classList.add("blur");
	$container[2].classList.add("blur");
	gamedone = true;
	localStorage.setItem("gamedone", true);

}

  
document.getElementsByClassName("modal-title")[1].innerHTML = "Sizzle - Wordle 六合彩版 第 " + Math.floor((Date.now() - 1643946444000) / (1000 * 60 * 60 * 24)) + " 期";

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
	if (JSON.stringify(arr) == JSON.stringify(answer)) {
		countwin();
	}
    for (var i = 0; i < 6; i++){
		if (answer[i] == $gamebox[m * 6 + i].innerHTML) {
			$gamebox[m * 6 + i].classList.add("card-green");
			$input[$gamebox[m * 6 + i].innerHTML - 1].classList.add("card-green");
			saver.push($gamebox[m * 6 + i].innerHTML);
			sharetext += '🟩';
		} else 
			if (answer.includes($gamebox[m * 6 + i].innerHTML)) {
				$gamebox[m * 6 + i].classList.add("card-red");
				$input[$gamebox[m * 6 + i].innerHTML - 1].classList.add("card-red");
				saver.push($gamebox[m * 6 + i].innerHTML);
				sharetext += '🟨';
			} else {
				$gamebox[m * 6 + i].classList.add("card-black");
				$input[$gamebox[m * 6 + i].innerHTML - 1].classList.add("card-black");
				saver.push($gamebox[m * 6 + i].innerHTML);
				sharetext += '⬛';
			}
		//alert(answer.includes($gamebox[m * 6 + i].innerHTML));
		
	}
	sharetext += "\n";
	window.localStorage.setItem("sharetext", sharetext);
	window.localStorage.setItem("saver", JSON.stringify(saver));
	if (m < 6) m++;
	window.localStorage.setItem("m", m);
	if (m == 6) {
		countwin();
		return;
	}
	
	n = 0;
	arr = [];
	window.localStorage.setItem("lastdate", date.yyyymmdd());

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
	$container[0].classList.remove("blur");
	$container[1].classList.remove("blur");
	$container[2].classList.remove("blur");
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

const btn = document.querySelector('.share');

// Share must be triggered by "user activation"
btn.addEventListener('click', async () => {
	try {
		var shareData = {
			title: 'Sizzle - Wordle 六合彩版',
			text: "Sizzle " + (date.yyyymmdd() - "20220204") + " " + document.getElementById("correctcount").innerHTML + "/6\n" + sharetext,
		}
     	 await navigator.share(shareData)
    } catch(err) {
      
    }
});