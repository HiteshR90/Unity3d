var cameraTarget			: GameObject;
var player					: GameObject;

var cameraHeight			: float = 0.0;
var smoothTime				: float = 0.2;
var borderX					: float = 2.0;
var borderY					: float = 2.0;

private var velocity		: Vector2;
private var moveScreenRight	: boolean =false;
private var moveScreenLeft	: boolean =false;

function Start(){
	cameraHeight = camera.transform.position.y;
}

function Update(){
	var moveDir = player.GetComponent(playerControls);
	
	if(cameraTarget.transform.position.x > camera.transform.position.x + borderX && moveDir.moveDirection == 1){
		moveScreenRight = true;
	}
	
	if(moveScreenRight){
		camera.transform.position.x = Mathf.SmoothDamp(camera.transform.position.x,camera.transform.position.x + borderX,velocity.y, smoothTime);
		//camera.transform.position.x = camera.transform.position.x + borderX;		
	}
	
	if(cameraTarget.transform.position.x < camera.transform.position.x - borderX && moveDir.moveDirection == 1){
		moveScreenRight = false;
	}
	
	if(cameraTarget.transform.position.x < camera.transform.position.x - borderX && moveDir.moveDirection == 0){
		moveScreenLeft = true;
	}
	
	if(moveScreenLeft){
		camera.transform.position.x = Mathf.SmoothDamp(camera.transform.position.x,camera.transform.position.x - borderX,velocity.y, smoothTime);
		//camera.transform.position.x = camera.transform.position.x - borderX;
	}
		
	if(cameraTarget.transform.position.x > camera.transform.position.x + borderX && moveDir.moveDirection == 0){
		moveScreenLeft = false;
	}
	camera.transform.position.y = cameraHeight;
}