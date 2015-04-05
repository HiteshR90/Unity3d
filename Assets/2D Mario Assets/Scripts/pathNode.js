enum PathInstruction { moveLeft = 0, moveRight = 1, moveStop = 2, jumpAir = 3}
var pathInstruction = PathInstruction.moveStop;

var overridejump			: boolean 	= false;
var jumpOverride			: float		= 8.0;

var changepathInstructionTo	: boolean	= false;
enum ChangeTo { moveLeft = 0, moveRight = 1, moveStop = 2, jumpAir = 3, removeTrigger = 4 }
var changeTo = ChangeTo.moveRight;
var tiggetCountDown			: int 		= 2;
var removeOnTrigger			: boolean	= false;
var removeTimeCountDown		: float 	= 1.0;
private var getChangeTo		: int;

function OnTriggerEnter(other : Collider){
	
	if(other.tag == "enemy"){
		if(changepathInstructionTo){
			if( tiggetCountDown <= 0 ){
				if( changeTo == ChangeTo.removeTrigger ){
					Destroy( gameObject );
				}
				else {
					getChangeTo = changeTo;
					pathInstruction = getChangeTo;
				}
			}
			else {
				tiggetCountDown--;
			}
		}
		if(removeOnTrigger) {
			Destroy( gameObject, removeTimeCountDown );
		}	
	}
}