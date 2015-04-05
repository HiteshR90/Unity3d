var cameraTarget		: GameObject;
var player 				: GameObject;

var smoothTime 			: float = 0.01;
var cameraFollowX		: boolean =true;
var cameraFollowY		: boolean = true;
var cameraFllowHeight	: boolean = false;
var cameraHeight		: float = 2.5;
var cameraZoom			: boolean = true;
var cameraZoomMax		: float = 4.0;
var cameraZoomMin		: float = 2.6;
var cameraZoomTime 		: float = 0.03;
var velocity 			: Vector2;

private var thisTransform	: Transform;
private var curPos 			: float = 0.0;
private var playerJumpHeight 		: float = 0.0;


function Start(){
	thisTransform = transform;
}

function Update(){
	if(cameraFollowX){
		transform.position.x = Mathf.SmoothDamp(thisTransform.position.x, cameraTarget.transform.position.x, velocity.x, smoothTime);
		//transform.position.x = cameraTarget.transform.position.x;
	}
	if(cameraFollowY){
		transform.position.y = Mathf.SmoothDamp(thisTransform.position.y, cameraTarget.transform.position.y, velocity.y, smoothTime);
	}
	if(!cameraFollowY && cameraFllowHeight){
		camera.transform.position.y = cameraHeight;
	}
		
	var playerControl = player.GetComponent(playerControls);
	
	if(cameraZoom){		
		curPos = player.transform.position.y;
		playerJumpHeight = curPos - playerControl.startPos;
		
		if(playerJumpHeight < 0){
			playerJumpHeight *= -1;
		}
		
		if(playerJumpHeight >  cameraZoomMax){
			playerJumpHeight = cameraZoomMax;
		}
		
		this.camera.orthographicSize = Mathf.Lerp(this.camera.orthographicSize,playerJumpHeight +cameraZoomMin,Time.time*cameraZoomTime);
	}
}