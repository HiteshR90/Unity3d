enum PickupType{
	Grow		=0,
	Key			=1,
	Coin		=2,
	FireBall	=3,
	ExtraLife	=4,
	GameTime	=5
}

var pickupType 		= PickupType.Grow;
var pickupValue				:int	=1;
var itemParticle			:Transform;
var soundItemPickup			:AudioClip;
var soundDelay				:float = 0.0;
var soundRate				:float = 0.0;

private var playerObject	: GameObject;
private var hudeGameObject	: GameObject;
private var extraLifeEnable	: boolean = false;

function Start(){
	playerObject 	= GameObject.FindWithTag("Player");
	hudeGameObject	= GameObject.FindWithTag("hud");
}

function OnTriggerEnter(other:Collider){
	if(other.tag == "collisionBoxBody"){
		var pProps = playerObject.GetComponent(playerProperties);
		ApplyPickup(pProps);
		
		renderer.enabled = false;
		
		if(itemParticle){
			Instantiate(itemParticle,transform.position,transform.rotation);
		}
		 
		if(soundItemPickup){
			PlaySound(soundItemPickup,0);
		}
		yield WaitForSeconds(audio.clip.length);
		
		if(extraLifeEnable){
			pProps.lives += pickupValue;
			extraLifeEnable = false;
		}
		
		Destroy(gameObject);
	}
}

function ApplyPickup(playerStatus : playerProperties){
	var hudConnect = hudeGameObject.GetComponent(hudController);
	switch(pickupType){
		case PickupType.Grow:
				if(playerStatus.playerState != PlayerState.MarioFire){
					playerStatus.playerState = PlayerState.MarioLarge;
					playerStatus.changeMario = true;
				}
			break;
		case PickupType.Key:
				playerStatus.AddKey(pickupValue);
			break;
		case PickupType.Coin:
				playerStatus.AddCoin(pickupValue);
				hudConnect.coin += pickupValue;
			break;
		case PickupType.FireBall:
				playerStatus.playerState = PlayerState.MarioFire;
				playerStatus.hasFire = true;
				playerStatus.changeMario = true;
			break;
		case PickupType.ExtraLife:
				extraLifeEnable = true;
			break;
		case PickupType.GameTime:
			break;
	}
}

function PlaySound(soundName, soundDelay){
	if(!audio.isPlaying && Time.time > soundRate){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
	}
}