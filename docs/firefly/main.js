title = "Firefly Catch";

description = `
  Catch fireflies 
        and 
  avoid wasps!
`;

characters = [
`
  ll
  ll
ccllcc
ccllcc
ccllcc
cc  cc
`,`
rr  rr
rrrrrr
rrpprr
rrrrrr
  rr
  rr
`,`
y  y
yyyyyy
 y  y
yyyyyy
 y  y
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
};

options = {
	viewSize: {x: settings.WIDTH, y: settings.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 42069,
    isPlayingBgm: false,
    isReplayEnabled: true,
    theme: "dark"
};

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
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

/**
 * @typedef {{
 * pos: Vector,
 * firingCooldown: number,
 * isFiringLeft: boolean
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


function update() {
	if (!ticks) {
		fireflies = times(settings.NUM_FIREFLIES, () => {
			const posX = rnd(0, settings.WIDTH);
            const posY = rnd(10, settings.HEIGHT - 30);
			return {
				pos: vec(posX, posY),
				speed: rnd(settings.FIREFLY_SPEED_MIN, settings.FIREFLY_SPEED_MAX)
			};
		});

		wasps = [];
	}

	//if fireflies get caught or go off screen, spawn new ones up to the number there should be (settings.NUM_FIREFLIES)
	if(fireflies.length < settings.NUM_FIREFLIES) {
		for(let i = fireflies.length; i < settings.NUM_FIREFLIES ; i++) {
			const posX = 10;
			const posY = rnd(10, settings.HEIGHT- 30);
			fireflies.push({
				pos: vec(posX, posY),
				speed: rnd(settings.ENEMY_MIN_BASE_SPEED, settings.ENEMY_MAX_BASE_SPEED)
			});
		}
	}

	//Spawn wasps at intervals of time
	if(ticks === 100) {
		const posX = 10;
		const posY = rnd(20, settings.HEIGHT- 30);
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
			const posY = rnd(20, settings.HEIGHT- 30);
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


	//remove conditions for wasps and fireflies
	remove(fireflies, (f) => {
		return f.pos.x > settings.WIDTH;
	});
	remove(wasps, (w) => {
		return w.pos.y > settings.HEIGHT || w.pos.y < 0;
	})
}
