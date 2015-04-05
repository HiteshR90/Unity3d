var hitDistance				: float 	= 3.0;					//this and hitTime for seconds on wait - goal is push player back one block
var hitTime					: float 	= 0.2;					//time for pushing player back
var hitSound				: AudioClip;						//hit audio file
var deadSound				: AudioClip;						//die audio file
	
private var playerLink		: GameObject;						//hold player object
private var hitLeft			: boolean	= false;				//toggle for hit left
private var hitRight		: boolean	= false;				//toggle for hit right
private var changeState		: boolean	= false;				//toggle for changing player state
private var soundRate		: float 	= 0.0;					//variable holding curent time+ delay time
private var soundDelay		: float		= 0.0;					//amound to delay for playing sound
private var pProp;												//set player properties

function Start(){												//initialize
	playerLink 	= GameObject.Find("player");					//find player game object and assign the playerLink to it
	pProp		= playerLink.GetComponent(playerProperties);	//get playerProperties.js
}

function Update () {											//loop
	HitLeft();													//Check for hit left
	HitRight();													//check for hit Right
	HitDead();													//check for dead state
	ChnagePlayerState();										//change player state
}

function OnTriggerEnter( other : Collider ){					//function for checking on colliders entering 
	Debug.Log(other.tag);
	if( other.tag == "enemyCollisionLeft" ){					//if collide with enemy on left
		
		hitLeft = true;											//enable hitLeft
	}
	if( other.tag == "enemyCollisionRight" ){					//if collide with enemy on right
		hitRight = true;										//enable hitRight
	}
}

function OnCollisionEnter ( other : Collider ){
	Debug.Log(other.tag);
	if( other.tag == "enemyCollisionLeft" ){					//if collide with enemy on left
		
		hitLeft = true;											//enable hitLeft
	}
	if( other.tag == "enemyCollisionRight" ){					//if collide with enemy on right
		hitRight = true;										//enable hitRight
	}
}

function OnTriggerExit( other : Collider ){						//function to checking on colliders leaving
	if( other.tag == "enemyCollisionLeft" ){					// if collider leaves enemy on Left
		yield WaitForSeconds ( hitTime );						//wait for hitTime before changingstate
		hitLeft = false;										//turn off hitLeft
		changeState = true;										//enable changeState to chnage player state
	}
	if( other.tag == "enemyCollisionRight" ){					// if collider leaves enemy on right
		yield WaitForSeconds ( hitTime );						//wait for hitTime before changingstate
		hitRight = false;										//turn off hitRight
		changeState = true;										//enable changeState to chnage player state
	}
}

function HitLeft(){												//player getting hit on left side
	if ( hitLeft ){
		PlaySound( hitSound, 0 );								//play hit sound file
		playerLink.transform.Translate( -hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
		yield WaitForSeconds( hitTime );						//wait time so that player can move back one block		
	}
}

function HitRight(){											//player getting hit on right side
	if ( hitRight ){
		PlaySound( hitSound, 0 );								//play hit sound file
		playerLink.transform.Translate( hitDistance * Time.deltaTime, hitDistance * Time.deltaTime, 0);
		yield WaitForSeconds( hitTime );						//wait time so that player can move back one block	
	}
}

function HitDead(){												//player getting hit on either side and is lost life
	if ( ( hitLeft || hitRight) &&  pProp.playerState == 1){
		changeState = true;
	}
}

function ChnagePlayerState(){									//change state of player( small, large, fireball)
	if ( changeState ){
		if ( pProp.playerState == 0 ){							// check if player is dead(0)
			pProp.playerState = PlayerState.MarioSmall;			//respawn as small mario
			pProp.changeMario = true;							//enable change state	
		} else if ( pProp.playerState == 1 ){					//check if player is small(1)
			pProp.dead = true;									//enable dead state for life
			pProp.playerState = PlayerState.MarioDead;			//chnage to dead state
			pProp.changeMario = true;							//enable change state
			PlaySound(deadSound,0);								//play dead sound when player die
		} else if ( pProp.playerState == 2 ){					//check if player is large(2)
			pProp.playerState = PlayerState.MarioSmall;			//change mario to small state
			pProp.changeMario = true;							//enable change state			
		} else if ( pProp.playerState == 3 ){					//check if player is fire(3)
			pProp.playerState = PlayerState.MarioLarge;			//change mario to large state
			pProp.changeMario = true;							//enable change state			
		}
		changeState = false;
	}
}

function PlaySound( soundName, soundDelay ){						// plays a sound and delay amount
	if( !audio.isPlaying && Time.time > soundRate ){
		soundRate 	= Time.time + soundDelay;
		audio.clip	= soundName;
		audio.Play();
		yield WaitForSeconds ( audio.clip.length );
	}
}