var moveSpeed 			: float 	= 1.0;
var bounceHeight		: float 	= .25;
var lifeSpan			: float 	= 3.0;
var smokePuff			: Transform;
var hitPosition			: float 	= 0.0;
var bounceUp			: boolean	= false;
var heightDifferance	: float		= 0.0;

function Start(){
	KillFireBall();
}

function Update (){
	if(bounceUp == true){
		transform.Translate(moveSpeed * Time.deltaTime,.75*Time.deltaTime,0);
		heightDifferance = transform.position.y - hitPosition;
		if(bounceHeight <= heightDifferance){
			bounceUp = false;
		}
	} else {
		transform.Translate(moveSpeed * Time.deltaTime,-1.0*Time.deltaTime,0);
	}
}

function OnTriggerEnter( other : Collider){
	if(other.transform.tag == "Untagged"){
		var hit : RaycastHit;
		if(Physics.Raycast(transform.position, Vector3(1,0,0),hit,0.1) ||Physics.Raycast(transform.position, Vector3(-1,0,0),hit,0.1) ){
			Destroy(gameObject);
		} else {
			Debug.Log("hit");
			bounceUp = true;
			hitPosition = other.transform.position.y;
		}		
	}
	if(other.transform.tag == "enemy"){
		ParticlePlay();
		Destroy(other.gameObject);
		Destroy(gameObject);
	}
}

function KillFireBall(){
	Destroy(gameObject,lifeSpan);
}

function ParticlePlay(){
	if(smokePuff){
		Instantiate(smokePuff, transform.position, transform.rotation);
	} else {
		
	}
}