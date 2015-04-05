var startPoint 			: Transform;
var soundDie			: AudioClip;

var curSavePos	: Vector3;

private var soundRate	: float 	= 0.0;
private var soundDelay	: float		= 0.0;
private var loseLife	: boolean	= false;
private var pProp;

function PlaySound(soundName, soundDelay)
{
	if(!audio.isPlaying && Time.time > soundDelay){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds( audio.clip.length );
	}
}

function OnTriggerEnter(other : Collider){
	
	if(other.tag=="savePoint"){
		curSavePos = transform.position;
	}
	
	if(other.tag=="killbox"){
		PlaySound(soundDie,0);
		loseLife = true;
		yield WaitForSeconds( 3 );
		renderer.enabled = false;
		pProp.playerState = PlayerState.MarioSmall;
		pProp.changeMario = true;
		if ( pProp.lives <= 0 ){
			return;
		}
		renderer.enabled = true;
		transform.position = curSavePos;
	}
}


function Start(){
	if(startPoint!=null){
		transform.position = startPoint.position;
		pProp = GetComponent( playerProperties );
	}
}

function Update(){
	if(loseLife){
		pProp.lives -= 1;
		loseLife = false;
	}
}