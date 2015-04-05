
enum BlockType	{	blockBounce, blockCoin, blockBreakable, blockSolid, blockQuestion}

enum PickUpType	{	pickUpMushroomGrow, pickUpMushroomLife, pickUpFireFlower}

enum BreakType	{	breakableGeometry, breakableParticles}

var BlockState 					: BlockType;
var BlockStateAfter				: BlockType;
var PickupState					: PickUpType;
var BreakState					: BreakType;

var blockCoinAmount				: int =	3;
var blockQuestionScrollSpeed	: float		= 0.5; 

var materialBlock1				: Material;			//regular block
var materialBlock2				: Material;			//solid block
var materialBlock3				: Material;			//piece block
var materialBlock4				: Material;			//question block

var pickCoin					: Transform;
var pickupMushroomGrow			: Transform;
var pickupMushroomLife			: Transform;
var pickupFireFlower			: Transform;
var breakableGeometry			: Transform;
var breakableParticles			: Transform;

var soundBump					: AudioClip;
var soundPickup					: AudioClip;

private var breakablePos		: Vector3;
private var pickupPos			: Vector3;
private var coinPos				: Vector3;
private var blockAni			: boolean = false;
private var coinMove			: boolean = false;
private var blockCoinAmountReset:int;

function Start(){
	coinPos 		= Vector3(transform.position.x,transform.position.y,transform.position.z + 0.2);
	pickupPos 		= Vector3(transform.position.x,transform.position.y+0.44,transform.position.z - .1);
	breakablePos	= Vector3(transform.position.x,transform.position.y+0.25,transform.position.z - 9 );
	audio.clip		= soundBump;
	blockCoinAmountReset = blockCoinAmount;
}


function OnTriggerEnter( other : Collider){
	if(other.tag == "collisionBoxHead"){
		blockAni = true;
	}
}

function Update(){
	
	switch(BlockState){
		case BlockState.blockBounce :
				renderer.material = materialBlock1;
				if( blockAni ){
					animation.Play("blockBounce");
					blockAni = false;
					audio.Play();
				}
			break;
		case BlockState. blockCoin :
				renderer.material = materialBlock1;
				if( blockAni ){
					animation.Play("blockBounce");
					Instantiate(pickCoin,coinPos,transform.rotation);
					blockAni = false;
					blockCoinAmount--;
					audio.clip = soundBump;
					audio.Play();
				}
				if(blockCoinAmount==0 && BlockStateAfter == BlockStateAfter.blockBounce){
					BlockState = BlockStateAfter;
				}
				if(blockCoinAmount==0 && BlockStateAfter == BlockStateAfter.blockCoin){
					BlockState = BlockStateAfter;
					BlockStateAfter = BlockState.blockBreakable;
				}
				if(blockCoinAmount==0 && BlockStateAfter == BlockStateAfter.blockBreakable){
					BlockState = BlockStateAfter;
				}
				if(blockCoinAmount==0 && BlockStateAfter == BlockStateAfter.blockSolid){
					BlockState = BlockStateAfter;
				}
				if(blockCoinAmount==0 && BlockStateAfter == BlockStateAfter.blockQuestion){
					BlockState = BlockStateAfter;
				}
			break;
		case BlockState.blockBreakable:
				renderer.material = materialBlock1;
				if( blockAni ){
					animation.Play("blockBounce");
					if(BreakState == BreakState.breakableGeometry){
						Instantiate(breakableGeometry,breakablePos,transform.rotation);
					}
					if(BreakState == BreakState.breakableParticles){
						Instantiate(breakableParticles,transform.position,transform.rotation);
					}
					Destroy(transform.parent.gameObject);
					blockAni = false;
				}
			break;
		case BlockState.blockSolid:
				renderer.material = materialBlock2;
			break;
		case BlockState.blockQuestion:
				renderer.material = materialBlock4;
				if( blockAni && PickupState== PickupState.pickUpMushroomGrow){
					animation.Play("blockBounce");
					Instantiate(pickupMushroomGrow,pickupPos,transform.rotation);
					audio.clip = soundBump;
					audio.Play();
					blockAni = false;
					BlockState = BlockStateAfter;
				}
				if( blockAni && PickupState== PickupState.pickUpMushroomLife){
					animation.Play("blockBounce");
					Instantiate(pickupMushroomLife,pickupPos,transform.rotation);
					audio.clip = soundPickup;
					audio.Play();
					blockAni = false;
					BlockState = BlockStateAfter;
				}
				if( blockAni && PickupState== PickupState.pickUpFireFlower){
					animation.Play("blockBounce");
					Instantiate(pickupFireFlower,pickupPos,transform.rotation);
					audio.clip = soundPickup;
					audio.Play();
					blockAni = false;
					BlockState = BlockStateAfter;
				}
				var offset : float = Time.time * blockQuestionScrollSpeed;
				renderer.material.mainTextureOffset = Vector2 (offset, 0);
			break;
			default:
			break;
	}
}
