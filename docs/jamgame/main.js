title = "";

description = `
 
`;

characters = [
	//Sc1
`
 bb   
b  b b
 bbbb
 bbbb
b  b b
 bb
`, 
	//Sc2
`
 bb
b  
 
 
b
 bb
`, 
	//rock1
	`
    bb
   bbb
 bbbbb
bbbbbb
bbbbbb
 bbbbb
   `, 
   //rock2
	`
bb  
bbb
bbbbb
bbbbb
bbbbb
bbbb
   `, 
	`
 bbbbb
  bggg
  bggg
  bggg
  bggg
  bbbbb
   `, 
   	`
bbb
gggb
gggb
gggb
gggb
bbbbb
   `, 


];

const settings = {
	WIDTH: 200,
	HEIGHT: 150,
}

options = {
	viewSize: {x: settings.WIDTH, y: settings.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 84845,
    isPlayingBgm: true,
    isReplayEnabled: true,
    theme: "dark"
};

let playerMove = 0;
let oppMove = 2;

let timeBar = 98;
let barSpeed = 0.15;

let oppY = 75;
let oppYChange = 3;

let win = 0;

function update() {
	if (!ticks) {
		oppMove = Math.floor(rnd(0, 3));
	}

	//display player size
	switch(playerMove) {
		case 0:
			char("a", 20, 75, {scale: {x: 6, y:4}});
			char("b", 40, 75, {scale: {x: 6, y:4}});
			break;
		case 1:
			char("c", 20, 75, {scale: {x: 6, y:4}});
			char("d", 40, 75, {scale: {x: 6, y:4}});
			break;
		case 2:
			char("e", 30, 65, {scale: {x: 4, y:8}});
			char("f", 50, 65, {scale: {x: 4, y:8}});
			break;
	}

	//display opp side
	switch(oppMove) {
		case 0:
			char("a", 155, oppY, {scale: {x: 6, y:4}, mirror: {x: -1}});
			char("b", 135, oppY, {scale: {x: 6, y:4}, mirror: {x: -1}});
			break;
		case 1:
			char("c", 155, oppY, {scale: {x: 6, y:4}, mirror: {x: -1}});
			char("d", 135, oppY, {scale: {x: 6, y:4}, mirror: {x: -1}});
			break;
		case 2:
			char("e", 160, oppY - 10, {scale: {x: 4, y:8}, mirror: {x: -1}});
			char("f", 140, oppY - 10, {scale: {x: 4, y:8}, mirror: {x: -1}});
			break;
	}

	//display vs
	text("VS", 95 + (sin(ticks/5) * 3), 80 + (sin(ticks/8) * 3), {scale: {x: 2, y:2}})

	//oppY += oppYChange;
	oppYChange *= -1;

	if(input.isJustPressed) {
		playerMove ++;
		if(playerMove > 2) {
			playerMove = 0;
		}
	}

	//time bar
	rect(50, 10, 100, 10);
	color("blue");
	rect(51, 11, timeBar, 8);
	color("black");

	timeBar -= barSpeed;

	if(timeBar <= 0) {
		timeBar = 98;
		//playerMove = 0;


		//determine win
		switch(oppMove) {
			case 0:
				//Scissors
				switch(playerMove) {
					case 0:
						win = 0;
						break;
					case 1:
						win = 2;
						break;
					case 2:
						win = 1;
						break;
				}
				break;
			case 1:
				switch(playerMove) {
					case 0:
						win = 1;
						break;
					case 1:
						win = 0;
						break;
					case 2:
						win = 2;
						break;
				}
				break;
			case 2:
				switch(playerMove) {
					case 0:
						win = 2;
						break;
					case 1:
						win = 1;
						break;
					case 2:
						win = 0;
						break;
				}
				break;
		}
		
		if(win == 0) {

		}
		else if(win == 1) {
			end("You Lose!");
		}
		else if(win == 2) {
			barSpeed += 0.12;
			color("red");
			particle(150, oppY, 20, 5);
			color("black");
			addScore(10);
			oppMove = Math.floor(rnd(0, 3));
		}

	}

	//console.log(playerMove);
}
