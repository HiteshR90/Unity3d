
var timeToPort		: float	= 2.0;
var tubePortalTo	: Transform;
var soundTube		: AudioClip;

private var moveDown	: boolean	= false;
private var moveUp		: boolean	= false;		

function OnTriggerStay (other : Collider){
	if(other.tag == "Player"){	
		if(Input.GetAxis("Vertical") < 0 ){
			var velX 	= other.GetComponent(playerControls).velocity.x;
			var moveDir	= other.GetComponent(playerControls).moveDirection;
			
			if(moveDir ==0){
				velX =0;
				other.GetComponent(aniSprite).aniSprite(16,16,0,9,16,24);
			}
			if(moveDir == 1){
				velX =0;
				other.GetComponent(aniSprite).aniSprite(16,16,0,8,16,24);
			}
			other.GetComponent(playerControls).enabled=false;
			moveDown = true;
			if(moveDown){
				other.transform.Translate(0,-5*Time.deltaTime,0);
				other.GetComponent(playerControls).PlaySound(soundTube, 0);
				yield WaitForSeconds(0.2);
				other.renderer.enabled = false;
				yield WaitForSeconds( timeToPort );
				other.transform.position = tubePortalTo.position;
				moveDown= false;
				moveUp = true;
			}
			if ( moveUp ){
				yield WaitForSeconds(1);
				other.GetComponent(playerControls).PlaySound(soundTube, 0);
				other.GetComponent(playerControls).gravity = 0.0;
				other.renderer.enabled = true;
				other.transform.Translate(0,4*Time.deltaTime,0);
				yield WaitForSeconds(.3);
				other.GetComponent(playerControls).gravity=20.0;
				other.GetComponent(playerControls).enabled=true;
				moveUp=false;
			} 
		}
		
	}
}