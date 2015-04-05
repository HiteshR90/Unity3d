
var mushroomDirection : boolean = false;

function OnTriggerEnter( other : Collider){
	if(other.tag == "block" || other.tag == "pickup_mushroom"){
		mushroomDirection = !mushroomDirection;
	}
}