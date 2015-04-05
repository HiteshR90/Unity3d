var coinSpeed : float = 0.3;

var coinValue 			: int = 1;
var coinParticle 		: Transform;
var soundCoinPickup		: AudioClip;
var playerGameObjet;
var hudGameObject;

private var coinTime 	: float = 0.2;

function Start(){
	hudGameObject 	= GameObject.FindWithTag("hud");
	playerGameObjet = GameObject.FindWithTag("Player");
}

function Update ()
{
	var aniPlay = GetComponent("aniSprite");
	aniPlay.aniSprite(16, 2, 0, 0, 21, 12 );
	transform.Translate(0,Time.deltaTime * coinSpeed, 0 );
	KillCoin();
}

function KillCoin(){
	yield WaitForSeconds(coinTime);
	Instantiate(coinParticle,transform.position,transform.rotation);
	AddToCoins();
	Destroy(gameObject);
}

function AddToCoins(){
	var hudConnect = hudGameObject.GetComponent(hudController);
	hudConnect.coin += coinValue;
	
	var playerConnect = playerGameObjet.GetComponent(playerProperties);
	playerConnect.coins += coinValue;
}
