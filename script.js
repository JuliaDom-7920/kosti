/* Користувач починає гру. --> Вводить своє ім’я. --> Робить свій хід. --> Свій хід робить ком’ютер. --> Коли кожен зробить по 5 ходів оголошується переможець. -->
*/
var top_bar=document.getElementById('top-bar'),
		point1=document.getElementById('point-1'),
		point2=document.getElementById('point-2'),
		game_area=document.getElementById('game-area'),
		dice=document.getElementById('dice'),
		btn_start=document.getElementById('btn-start'),
		btn_next=document.getElementById('btn-next'),
		btn_throw=document.getElementById('btn-throw'),
		btn_restart=document.getElementById('btn-restart'),
		mssg_box=document.getElementById('message-box'),
		error=document.getElementById('error'),
		mssg=document.getElementById('message'),
		input_name=document.getElementById('input-name'),
		player1=document.getElementById('player-name'),
		rate=document.getElementById('rate'),
		dice_side=['dice1.png','dice2.png','dice3.png','dice4.png','dice5.png','dice6.png'],
		dice1=document.getElementById('dice-1'),
		dice2=document.getElementById('dice-2'),
		playerPoint=0,
		botPoint=0,
		i=5;
//Анімація кубиків
function dice_animation() {
	dice1.setAttribute('src','dice.gif');
	dice2.setAttribute('src','dice.gif');
}
//Почати гру		
function start_game() {
	mssg_box.style.display='block';
	input_name.style.display='block';
	btn_start.style.display='none';
	btn_next.style.display='block';
}
// Продовжити гру
function next_game() {
	var name=document.getElementById('input-name').value;
	if (name<1) {
		error.style.display='block';
	} else { 
		error.style.display='none';
		player1.innerHTML=name;
		input_name.style.display='none';
		rateVal=Math.floor((Math.random()*100+50)*100)/100;
		rate.innerHTML=rateVal;
		top_bar.style.display='grid';
		mssg.style.display='block';
		mssg.innerHTML='Гра проти комп’ютера. Кількість ходів для кожного учасника становить 5 ходів. Переможець забирає винагороду.';
		btn_next.style.display='none';
		btn_throw.style.display='block';
		game_area.style.display='block';
	}
}	
//Зробити хід
function throw_dice() {
	if(i>0) {
		mssg_box.style.display='none';
		btn_throw.style.display='none';
		setTimeout(dice_animation,100);
		//Зміна сторін кубиків гравця
		function player_dice_change(playerDice1Val,playerDice2Val) {
			playerDice1Val=Math.floor(Math.random()*6)+1;
			dice1.setAttribute('src','dice'+playerDice1Val+'.png');
			playerDice2Val=Math.floor(Math.random()*6)+1;
			dice2.setAttribute('src','dice'+playerDice2Val+'.png');
			var playerDiceTotal=playerDice1Val+playerDice2Val;
			playerPoint+=playerDiceTotal;
			//Повідомлення про кількість очок за один хід гравця
			function mssg_player1() {
				if(i==4||i==3||i==2)
					var tail='залишилось '+i+' ходи.';
				else if(i==1)
					tail='алишився '+i+' хід.';
				else tail='залишилось '+i+' ходів;';
				mssg_box.style.display='block';
				mssg.style.display='block';
				mssg.innerHTML='На кубиках випало '+ playerDice1Val+' і '+ playerDice2Val+'.<br>В сумі '+playerDiceTotal+' очок.<br>У вас '+tail+'<br>Наступний хід за Бот.';
				point1.innerHTML=playerPoint;
			}
			setTimeout(mssg_player1,100);
		}
		setTimeout(player_dice_change,1200);
		//Хід ком’ютера
		function inter_round() {
			mssg_box.style.display='none';
			setTimeout(dice_animation,100);
			//Зміна сторін кубиків комп’ютера
			function bot_dice_change(botDice1Val,botDice2Val) {
				botDice1Val=Math.floor(Math.random()*6)+1;
				dice1.setAttribute('src','dice'+botDice1Val+'.png');
				botDice2Val=Math.floor(Math.random()*6)+1;
				dice2.setAttribute('src','dice'+botDice2Val+'.png');
				var botDiceTotal=botDice1Val+botDice2Val;
				botPoint+=botDiceTotal;
				//Повідомлення про кількість очок за один хід комп’ютера
				function mssg_player2() {
					var name=document.getElementById('input-name').value;
					mssg_box.style.display='block';
					mssg.style.display='block';
					mssg.innerHTML='На кубиках випало '+botDice1Val+' і '+botDice2Val+'.<br>В сумі '+botDiceTotal+' очок.<br>Наступний хід за '+name+'.';
					point2.innerHTML=botPoint;
					if(i>0) {
					btn_throw.style.display='block';
					} else {
						btn_throw.style.display='none';
					}
				}
				setTimeout(mssg_player2,100);
			}
			setTimeout(bot_dice_change,1200);
		}
		setTimeout(inter_round,5000);
	}
	i--;
	if(i==0) { 
		function game_over() {
			var name=document.getElementById('input-name').value;
			btn_throw.style.display='none';
			if(playerPoint>botPoint) {
				var winner=name;
				mssg.innerHTML='Вітаємо!<br>Ви, '+winner+', перемогли з рахунком '+playerPoint+' : '+botPoint+'.<br>Ваша  винагорода становить '+rateVal+'.';
			} 
			else if(playerPoint==botPoint) {
				mssg.innerHTML='Нічия! Рахунок '+playerPoint+' : '+botPoint+'.<br>Спробуйте ще.';
			}
			else {
				winner='Бот';
				mssg.innerHTML='Переміг '+winner+' з рахунком '+playerPoint+' : '+botPoint+'.<br>Пощастить наступного разу.';
			}
			btn_restart.style.display='block';
		}
		setTimeout(game_over, 11000);
	}
	if(i<0) {
		i=5;
		playerPoint=0;
		point1.innerHTML=playerPoint;
		botPoint=0;
		point2.innerHTML=botPoint;
	}
}
//Почати гру ще раз
function restart_game() {
	rateVal=Math.floor((Math.random()*100+50)*100)/100;
	rate.innerHTML=rateVal;
	mssg.innerHTML='Гра проти комп’ютера. Кількість ходів для кожного учасника становить 5 ходів. Переможець забирає винагороду.';
	btn_restart.style.display='none';
	btn_throw.style.display='block';
	throw_dice();
}