enum PlayerState{
	MarioDead 	= 0,
	MarioSmall 	= 1, 
	MarioLarge 	= 2, 
	MarioFire 	= 3	
}

var playerState = PlayerState.MarioSmall;

var lives 					: int =3;
var key 					: int =0;
var coins 					: int		=0;
var projectileFire			: GameObject;
var projectilescoketRight 	: Transform;
var projectilesocketLeft 	: Transform;
var materialMarioStandard	: Material;
var materialMarioFire		: Material;

var changeMario				: boolean = false;
var hasFire 				: boolean = false;

var fireSound 				: AudioClip;
var soundDie				: AudioClip;

var dead					: boolean = false;

private var coinLife 		: int 		= 20;
private var canShoot 		: boolean 	= false;
private var soundRate		: float 	= 0.0;					//variable holding curent time+ delay time
private var soundDelay		: float		= 0.0;					//amound to delay for playing sound


function AddKey(numKey :int){
	key += numKey;
}

function AddCoin( numCoin : int ){
	coins += numCoin;
}

function playSound(){
	audio.clip = fireSound;
	audio.Play();
	yield WaitForSeconds(audio.clip.length);
}

function Update ()
{
	var playerControls = GetComponent("playerControls");
	
	PlayerLives();
	
	if(changeMario){
		SetPlayerState();
	}
	
	if(canShoot){
	
		var clone;
		if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 0){
			clone =Instantiate(projectileFire, projectilesocketLeft.transform.position, transform.rotation);
			//clone.rigidbody.AddForce(-90,0,0);
			clone.GetComponent(projectileFireball).moveSpeed = -2.0;
			//playSound();
		}
		
		if(Input.GetButtonDown("Fire1") && projectileFire && playerControls.moveDirection == 1){
			clone =Instantiate(projectileFire, projectilescoketRight.transform.position, transform.rotation);
			//clone.rigidbody.AddForce(90,0,0);
			clone.GetComponent(projectileFireball).moveSpeed = 2.0;
			//playSound();
		}
		
	} else
		return;	
}

function SetPlayerState()
{
	var playerControls = GetComponent("playerControls");
	var charController = GetComponent(CharacterController);
	
	switch(playerState){
	
		case PlayerState.MarioSmall:
			playerControls.gravity = 0.0;
			transform.Translate(0,0.2,0);
			transform.localScale = Vector3(1.0,0.75,1.0);
			charController.height = 0.45;
			transform.renderer.material = materialMarioStandard;			
			playerControls.gravity = 20.0;
			canShoot	=false;
			changeMario	=false;
		break;
		
		case PlayerState.MarioLarge:
			playerControls.gravity = 0.0;
			transform.Translate(0,0.2,0);
			transform.localScale = Vector3(1.0,1.0,1.0);
			charController.height = 0.50;
			transform.renderer.material = materialMarioStandard;
			playerControls.gravity = 20.0;
			canShoot	=false;
			changeMario	=false;
		break;
		
		case PlayerState.MarioFire:
			playerControls.gravity = 0.0;
			transform.Translate(0,0.2,0);
			transform.localScale = Vector3(1.0,1.0,1.0);
			charController.height = 0.50;
			transform.renderer.material = materialMarioFire;
			playerControls.gravity = 20.0;
			canShoot	=true;
			changeMario	=false;
		break;
		
		case PlayerState.MarioDead:
			playerControls.gravity = 0.0;
			this.transform.Translate(0,3 * Time.deltaTime, 0);
			this.transform.position.z = -1;
			yield WaitForSeconds(.4);
			playerControls.gravity = 20.0;
			yield WaitForSeconds(2);
			if( dead ){
				lives--;
				this.transform.position = GetComponent(spawnSaveSetup).curSavePos;
				playerState = PlayerState.MarioSmall;
				changeMario = true;
				dead = false;
			}
			changeMario	=false;
		break;
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

function PlayerLives(){
	if( lives == 0 ){
		PlaySound(soundDie,0);
		yield WaitForSeconds(3);
		Application.LoadLevel("2D Mario Screen Lose");
	}
}