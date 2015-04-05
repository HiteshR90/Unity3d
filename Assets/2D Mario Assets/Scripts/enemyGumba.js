var moveSpeed					: float 	= 20.0;
var attackMoveSpeed				: float 	= 35.0;
var jumpSpeed					: float 	= 3.0;
enum GumbaState { moveLeft =0, moveRight =1, moveStop=2, jumpAir=3, enemyDie=4, goHome=5}
var gumbaState	= GumbaState.moveLeft;
var attackRang					: float 	= 1.0;
var searchRange					: float		= 3.0;
var returnHomeRange				: float 	= 4.0;
var chnageDirectionDistance		: float 	= 0.5;
var chaseTarget					: Transform;
var homePosition				: Transform;
var deathForce					: float 	= 3.0;
var gizmoToggle					: boolean	= true;
var bounceHit					: AudioClip;

private var velocity			: Vector3 	= Vector3.zero;
private var gravity				: float   	= 20.0;
private var currentState;
private var aniPlay;
private var isRight				: boolean 	= false;
private var myTransform 		: Vector3;
private var resetMoveSpeed		: float 	= 0.0;
private var distanceToHome		: float 	= 0.0;
private var distanceToTarget	: float 	= 0.0;
private var controller 			: CharacterController;

private var getPathInstruction	: int;

function Start(){
	myTransform 			= transform.position;
	resetMoveSpeed 			= moveSpeed;
	linkToPlayerProperties 	= GetComponent(playerProperties);
	controller				= GetComponent(CharacterController);
	aniPlay					= GetComponent(aniSprite);
}

function Update () {
	distanceToTarget = Vector3.Distance(chaseTarget.transform.position, transform.position);
	if( distanceToTarget <= searchRange){
		ChasePlayer();
		if(distanceToTarget <= attackRang){
			ChasePlayer();
			moveSpeed = attackMoveSpeed;
		} 
		else {
			ChasePlayer();
			moveSpeed = resetMoveSpeed;
		}
	} 
	else {
		distanceToHome = Vector3.Distance(homePosition.transform.position, transform.position);
		if( distanceToHome > returnHomeRange){
			GoHome();
		}			
	}
	
	if( controller.isGrounded ){
		switch (gumbaState){
			case GumbaState.moveLeft :
				PatrolLeft();
			break;
			case GumbaState.moveRight :
				PatrolRight();
			break;
			case GumbaState.moveStop :
				if(isRight)
					IdelRight();
				else
					IdelLeft();				
			break;
			case GumbaState.jumpAir :
				if(isRight)
					JumpRight();
				else
					JumpLeft();
			break;
			case GumbaState.enemyDie :
				if(isRight)
					DieRight();
				else
					DieLeft();
			break;
			case GumbaState.goHome :
				GoHome();
			break;
		}
	}
	
	//Apply Gravity
	velocity.y -= gravity * Time.deltaTime;
	//Move the Controller
	controller.Move( velocity * Time.deltaTime );
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "pathNode" ){
		var linkToPathNode = other.GetComponent(pathNode);
		getPathInstruction = linkToPathNode.pathInstruction;
		gumbaState = getPathInstruction;
		
		if( linkToPathNode.overridejump ){
			jumpSpeed = linkToPathNode.jumpOverride;
		}
	}
	if( other.tag == "collisionBoxFeet" ){
		var playerLink : GameObject;
		playerLink = GameObject.Find("player");
		playerLink.GetComponent(playerControls).velocity.y = deathForce;	//make player bounce in air
		
		audio.clip = bounceHit;
		audio.Play();
		
		var boxCollider = GetComponent(BoxCollider) as BoxCollider;
		if(boxCollider){
			boxCollider.size = Vector3(0,0,0);
			Destroy(boxCollider);
			gumbaState = GumbaState.enemyDie;
		}
		else {
			Debug.Log("could not load box collider");
		}
	}
	if(other.tag == "enemy"){
		if(other.collider != collider){
			Physics.IgnoreCollision(other.collider, collider);
		}
	}
}

function PatrolRight(){
	velocity.x = moveSpeed * Time.deltaTime;	//move the controller to right
	currentState = gumbaState;
	aniPlay.aniSprite(16, 16, 0, 6, 16, 24);	// draw run right
	isRight = true;
}

function PatrolLeft(){
	velocity.x = -moveSpeed * Time.deltaTime;	//move the controller to left
	currentState = gumbaState;
	aniPlay.aniSprite(16, 16, 0, 7, 16, 24);	// draw run left
	isRight = false;
}

function IdelRight(){
	velocity.x = 0;
	currentState = gumbaState;
	aniPlay.aniSprite(16, 16, 0, 0, 31, 24);
	isRight = true;
}

function IdelLeft(){
	velocity.x = 0;
	currentState = gumbaState;
	aniPlay.aniSprite(16, 16, 0, 2, 31, 24);
	isRight = false;
}

function JumpRight(){
	velocity.y = jumpSpeed;
	gumbaState = currentState;
	aniPlay.aniSprite(16, 16, 7, 8, 1, 24);
	isRight = true;
}

function JumpLeft(){
	velocity.y = jumpSpeed;
	gumbaState = currentState;
	aniPlay.aniSprite(16, 16, 7, 9, 1, 24);
	isRight = false;
}

function DieRight(){
	velocity.x = 0;
	yield WaitForSeconds( 0.1 );
	aniPlay.aniSprite(16, 16, 0, 10, 16, 24);
	yield WaitForSeconds( 0.4 );
	Destroy( gameObject );
}

function DieLeft(){
	velocity.x = 0;
	yield WaitForSeconds( 0.1 );
	aniPlay.aniSprite(16, 16, 0, 11, 16, 24);
	yield WaitForSeconds( 0.4 );
	Destroy( gameObject );
}

function ChasePlayer(){
	if(transform.position.x <= chaseTarget.position.x - chnageDirectionDistance){
		gumbaState = GumbaState.moveRight;
	}
	if(transform.position.x >= chaseTarget.position.x + chnageDirectionDistance){
		gumbaState = GumbaState.moveLeft;
	}
}

function GoHome(){
	if(transform.position.x <= homePosition.position.x){
		gumbaState = GumbaState.moveRight;
	}
	if(transform.position.x >= homePosition.position.x){
		gumbaState = GumbaState.moveLeft;
	}
}

function OnDrawGizmos(){
	if(gizmoToggle){
		Gizmos.color = Color.red;
		Gizmos.DrawWireSphere(transform.position, attackRang);
		Gizmos.color = Color.blue;
		Gizmos.DrawWireSphere(transform.position, searchRange);
		Gizmos.color = Color.green;
		Gizmos.DrawWireSphere(homePosition.position, returnHomeRange);
	}	
}