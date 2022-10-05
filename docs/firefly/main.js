title = "Firefly Catch";

description = `
  Catch fireflies, 

  avoid wasps!
`;

characters = [
// firefly
`
  ll
  ll
ccllcc
ccllcc
ccllcc
cc  cc
`, // wasp
`
rr  rr
rrrrrr
rrpprr
rrrrrr
  rr
  rr
`,
// jar lid
`
      
      
      
      
llllll
llllll 
`, // jar base frame 1
`
L    L
Lc   L
L    L
L  y L
L    L
 LLLL 
`, // jar base frame 2
`
L    L
L    L
L  c L
L y  L
L    L
 LLLL 
`, // hands
`
  lll 
  lll
  lll 
   l    
   l  
   l    
`
];

const settings = {
	WIDTH: 300,
	HEIGHT: 150,

    FIREFLY_SPEED_MIN: 0.5,
	FIREFLY_SPEED_MAX: 1.0,

	WASP_SPEED_MIN: 0.5,
	WASP_SPEED_MAX: 1.0,
    
    PLAYER_FIRE_RATE: 4,
    PLAYER_GUN_OFFSET: 3,

	NUM_FIREFLIES: 20,

	PLAYER_SPEED: 1,
};

options = {
	viewSize: {x: settings.WIDTH, y: settings.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 42069,
    isPlayingBgm: false,
    isReplayEnabled: true,
    theme: "shapeDark"
};

/**
 * @typedef {{
 * pos: Vector,
 * speed: number,
 * color: Color
 * }} Firefly
 */

/**
 * @type { Firefly [] }
 */
let fireflies;

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Wasp
 */

/**
 * @type { Wasp [] }
 */
let wasps;

//controlling the Jar/Player
/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @type { number }
 */
 let numWasps;

 /**
 * @typedef {{
  * units: number,
  * color: Color
  * }} Order
  */
 
 /**
  * @type { Order }
  */
 let order;

/**
  * @type { Color [] }
  */
 let colors;

 colors = ["red", "purple", "yellow", "blue"];

function update() {
	if (!ticks) {
		
		let xPos = 10;
		fireflies = times(settings.NUM_FIREFLIES, () => {
			xPos += 15;
			const posX = xPos;
            const posY = rnd(25, settings.HEIGHT - 30);
			return {
				pos: vec(posX, posY),
				speed: rnd(settings.FIREFLY_SPEED_MIN, settings.FIREFLY_SPEED_MAX),
				color: colors[Math.floor(Math.random() * 4)]
			};
		});

		order = {
			units: Math.floor(rnd(0, 5)),
			color: colors[Math.floor(Math.random() * 4)]
		}
		wasps = [];


		//player
		player = {
			pos:vec(settings.WIDTH * 0.5, settings.HEIGHT - 3), 
			speed: settings.PLAYER_SPEED
		};
	}

	//print jar out
	char("d", player.pos.x, player.pos.y);
	// const d = char(addWithCharCode("d", floor(ticks/30)%2), player.pos); figuring out animation
	char("c", player.pos.x, player.pos.y - 6);
	if (input.isPressed && player.pos.y > 25) {
		player.pos.y--
		char("c", player.pos.x, player.pos.y - 7, { rotation: 45 });
	} else {
		player.pos.y++
	}
	//trying to move it
	//player.pos = vec(input.pos.x, input.pos.y);
	//player.pos = vec(settings.Width + 10, settings.HEIGHT);

	// hands?
	char("f", player.pos.x - 4, player.pos.y + 6);
	char("f", player.pos.x + 3, player.pos.y + 6);


	//Display lines at top
	line(0, 20, 300, 20, 4);
	line(125, 0, 125, 20, 4);
	line(175, 0, 175, 20, 4);

	//Display order
	color(order.color);
	box(145, 10, 3);
	text("x" + order.units, 152, 10)
	color("black");

	//if fireflies get caught or go off screen, spawn new ones up to the number there should be (settings.NUM_FIREFLIES)
	if(fireflies.length < settings.NUM_FIREFLIES) {
		for(let i = fireflies.length; i < settings.NUM_FIREFLIES ; i++) {
			const posX = 10;
			const posY = rnd(25, settings.HEIGHT- 30);
			fireflies.push({
				pos: vec(posX, posY),
				speed: rnd(settings.ENEMY_MIN_BASE_SPEED, settings.ENEMY_MAX_BASE_SPEED),
				color: colors[Math.floor(Math.random() * 4)]
			});
		}
	}

	//Spawn wasps at intervals of time
	if(ticks === 100) {
		const posX = 10;
		const posY = rnd(35, settings.HEIGHT- 30);
		wasps.push({
			pos: vec(posX, posY),
			speed: 0.32
		});
		numWasps ++;
	}
	//if wasps get destroyed spawn more up to the number there should be on the screen
	if(wasps.length < numWasps) {
		for(let i = wasps.length; i < numWasps; i++) {
			const posX = 10;
			const posY = rnd(25, settings.HEIGHT- 30);
			wasps.push({
				pos: vec(posX, posY),
				speed: 0.32
			});
		}
	}

	//Update functions for wasps and fireflies
	wasps.forEach((w) => {
		if(w.pos.x >= settings.WIDTH || w.pos.x <= 0) {
			w.speed *= -1;	
		}
		w.pos.x += w.speed;
		w.pos.y += sin(w.pos.x/5);
		char("b", w.pos);
	});
	fireflies.forEach((f) => {
		
		f.pos.x += 0.25;
		char("a", f.pos);
	});

	//update function for player
	// player.forEach((p) => {
	// 	//move jar to the left
	// 	p.pos.x += p.speed;
	// });
	// player => {
	// 	player.pos.x += 1;
	// 	char("c", player.pos);
	// }



	//remove conditions for wasps and fireflies
	remove(fireflies, (f) => {
		return f.pos.x > settings.WIDTH;
	});
	remove(wasps, (w) => {
		return w.pos.y > settings.HEIGHT || w.pos.y < 0;
	})
}
