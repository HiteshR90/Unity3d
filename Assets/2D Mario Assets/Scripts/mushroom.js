
var mushroomSpeed 	: float = 1.0;
var mushroomDirection  	: GameObject;

//private var mushroomDir : boolean = false;

function Update(){
	moveDirection = mushroomDirection.GetComponent(mushroomCollider).mushroomDirection;
	
	if(moveDirection){
		mushroomSpeed = 1;
	}
	if(!moveDirection){
		mushroomSpeed = -1;
	}
	transform.Translate(mushroomSpeed * Time.deltaTime, 0,0);
}