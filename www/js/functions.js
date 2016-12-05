function toasty(text,style,time,position)
{
	if(time == undefined) time=2000;
	if(style == undefined) style='default';
	if(text == undefined) return;
	
	style = style.toLowerCase();
	var bgColor,fColor;
	switch(style)
	{
		case 'error':
			bgColor = '#e53935';
			color = 'white';
			break;
		case 'success':
			bgColor = '#388e3c';
			color = 'white';
			break;
		case 'sahara':
			bgColor = '#fb8c00';
			color = 'white';
			break;
		case 'prince':
			bgColor = '#5e35b1';
			color = 'white';
			break;
		case 'expired':
			bgColor = '#D0D0D0';
			color = 'black';
			break;
		default:
			 bgColor = 'black';
			 color = 'white';
			 break;
	}

	var $toastContent = $(`<span class="just">${getTranslatedWord(text)}</span>`);
	Materialize.toast($toastContent, time);
	$('.toast').css('background-color',bgColor);
	$('.toast').css('color',color);
	$('#toast-container').css('width','100%');
	if(!position)
	{
		$('#toast-container').css('top','auto');
		$('#toast-container').css('right','auto');
		$('#toast-container').css('bottom','50%');
	}
	$('.toast').css('width','100%');
	$('.toast').css('text-align','center');
	$('.toast span').css('width','100%');
}

const storage = window.localStorage;
const excludedArrowMenu = ['index'];
const excludedLoc = ['index'];
const options = {
	'savedPasswords':'liSavedPassword',
	'settings':'liSettings',
};
let notified = false;

function getLoc()
{
	return window.location.pathname.split('/')[(window.location.pathname.split('/')).length - 1].split('.')[0];
}

function redirect(url)
{
	window.location.replace(url);
}

function getItem(item)
{
	return storage.getItem(item);
}

function removeItem(item)
{
	storage.removeItem(item);
}

function setItem(item,val)
{
	storage.setItem(item,val);
}

function emptyCheck(data,type)
{
	let vData = data;
	if(type == 's')
	{
		vData = data.split(',');
	}

	for(let i = 0; i < vData.length; i++)
	{
		let vE = vData[i].split('--');
		let e = document.getElementById(vE[0]);
		let errMessage = vE[1];
		if(e == null) continue;
		if(e.value.trim() == "")
		{
			toasty(errMessage,'error');
			e.focus();
			return true;
		}
	}
	return false;
}

function getCard(cT,cC)
{
	return `<div class="row" id="noItemCard"><div class="col s12">
			<div class="card blue-grey darken-1" id="card">
			<div class="card-content white-text">
			<span class="card-title">${cT}</span>
			<p class="center-align">${cC}</p>
			</div></div></div></div>`;
}

function parse(json)
{
	return JSON.parse(json);
}

function setLocation()
{
	setItem('location',getLoc());
}

function formatDateFromDB(date)
{
	return date.split('-').reverse().join('/');
}

class Loader
{
	constructor(contents = [])
	{
		const dE = document.getElementsByClassName('container')[0];
		dE.innerHTML = `<div class="preloader-wrapper active" id="loader">
			<div class="spinner-layer spinner-blue-only">
				<div class="circle-clipper left">
					<div class="circle"></div>
				</div>
				<div class="gap-patch">
					<div class="circle"></div>
				</div>
				<div class="circle-clipper right">
					<div class="circle"></div>
				</div>
			</div>
		</div>` + dE.innerHTML; 
		this.loader = document.getElementById('loader');
		this.stop();
	}

	stop()
	{
		this.loader.style.display = 'none';
	}

	start()
	{
		this.loader.style.display = 'block';
	}
}

function checkBackArrow()
{
	if(excludedArrowMenu.indexOf(getLoc()) != -1)
	{
		document.getElementById('backMenuArrow').style.display = 'none';
	}
}

function checkSelectedOption()
{
	const l = getLoc();
	const name = `.${options[l]}`;
	$(name).addClass('selectedOption');
}

$(".brand-logo").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});

const uLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const lLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const symbols = ['!','#','$','%','&','*','+','-','.','/',':',';','=','?','@','[',']','_','~'];
const found = {uLetter:0,lLetter:0,numbers:0,symbols:0};
let symbolsCheck = true;

function newDigits()
{
	let newDigit = "0";
	for(let i = 1; i <= 7; i++)
	{
		newDigit += Math.floor(Math.random() * 2);
	}
	return newDigit;
}

function getValue(binaryCode)
{
	const charCode = parseInt(binaryCode,2);
	if(charCode < 32 || charCode > 126) return false;

	const character =  String.fromCharCode(charCode);

	if(uLetters.indexOf(character) != -1)
	{
		found.uLetter = 1;
	}
	else
	{
		if(lLetters.indexOf(character) != -1)
		{
			found.lLetter = 1;
		}
		else
		{
			if(numbers.indexOf(character) != -1)
			{
				found.numbers = 1;
			}
			else
			{
				if(symbolsCheck)
				{
					if(symbols.indexOf(character) != -1)
					{
						found.symbols = 1;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return false;
				}
			}
		}
	}

	return character;
}

function getPass(longPass)
{
	let vFinalPass;
	do
	{
		vFinalPass = [];

		for(let i = 0; i < longPass; i++)
		{
			let digit = '0';
			for(let j = 0; j <= 7; j++)
			{
				digit += Math.floor(Math.random() * 2);
			}
			const parcialValue = getValue(digit);
			if(parcialValue != false)
			{
				if(checkPrev(vFinalPass,(i - 1),parcialValue))
				{
					vFinalPass[i] = parcialValue;
				} else {
					i--;
				}
			} else {
				i--;
			}
		}
	} while(found.uLetter == 0 || found.lLetter == 0 || found.numbers == 0 || found.symbols == 0)
	
	return vFinalPass.join('');
}

function checkPrev(arr,index,val)
{
	if(arr[index] == undefined) return true;

	if(uLetters.indexOf(val) != -1)
	{
		if(uLetters.indexOf(arr[index]) != -1)
		{
			return false;
		} else {
			return true;
		}
	}

	if(lLetters.indexOf(val) != -1)
	{
		if(lLetters.indexOf(arr[index]) != -1)
		{
			return false;
		} else {
			return true;
		}
	}

	if(numbers.indexOf(val) != -1)
	{
		if(numbers.indexOf(arr[index]) != -1)
		{
			return false;
		} else {
			return true;
		}
	}

	if(symbols.indexOf(val) != -1)
	{
		if(symbols.indexOf(arr[index]) != -1)
		{
			return false;
		} else {
			return true;
		}
	}
}

function setFound()
{
	found.uLetter = 0;
	found.lLetter = 0;
	found.numbers = 0;
	found.symbols = 0;
}

function generate()
{
	l.start();
	$('.showGenerate').show();
	const lengthPass = $('#longPass').val();
	setFound();
	const type = $('#typeCharacters').val();
	if(type == '1')
	{
		symbolsCheck = false;
		found.symbols = 1;
	}
	const passes = getItem('passes');
	let pass = '';
	do {
		pass = getPass(lengthPass);
	} while(passes != null && passes.indexOf(pass) != -1);

	$('#passResult').html(checkLengthPass(pass));
	l.stop();
}

function checkLengthPass(p)
{
	let newLength;
	let pass = p;
	let start = 0;
	let truncatePass = '';
	if(pass.length > 20)
	{
		do
		{
			if(truncatePass != '') truncatePass += `</br>`;
			truncatePass += pass.substring(0,20);
			pass = pass.substring(20);
		} while (pass.length > 20);
		truncatePass += `</br>${pass}`;
	}
	else
	{
		truncatePass = p;
	}

	return truncatePass;
}

function savePass()
{
	const pass = $('#passResult').html();
	const today = getShowDate(new Date());
	let vPasses = getItem('passes');
	if(vPasses == undefined || vPasses == null)
	{
		vPasses = `${pass}//${today}`;
	}
	else
	{
		vPasses = `${pass}//${today}/--/${vPasses}`;
	}

	let splited = vPasses.split('/--/'); 

	if(splited.length > 10)
	{
		splited.splice((splited.length - 1),1);
		vPasses = splited.join('/--/');
	}

	setItem('passes',vPasses);
	$('#saveBtn').hide();
	toasty(getTranslatedWord('Password saved'),'success');
}

function getShowDate(d)
{
	const dToShow = (String(d.getDate()).length == 1) ? `0${d.getDate()}` : d.getDate();
	const mToShow = (String(d.getMonth() + 1).length == 1) ? `0${d.getMonth() + 1}` : (d.getMonth() + 1);
	const yToShow = (d.getFullYear());

	return `${yToShow}-${mToShow}-${dToShow}`;
}

function setLengthValue()
{
	const lengthPass = $('#longPass').val();
	$('#lengthValue').html(lengthPass);
}

function formatDateFromDB(date)
{
	return date.split('-').reverse().join('/');
}

document.addEventListener("deviceready", backControl, false);

function backControl(){
    document.addEventListener("backbutton", function(e){
       if(getLoc() == 'index'){
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           redirect('index.html');
       }
    }, false);
}

document.addEventListener('DOMContentLoaded', checkSelectedOption, false);