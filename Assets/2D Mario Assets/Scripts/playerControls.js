var walkSpeed 					: float = 1.5;
var runSpeed 					: float = 2.0;
var fallSpeed 					: float = 2.0;
var walkJump 					: float = 6.5;
var runJump 					: float = 9.0;
var crouchJump 					: float = 10.0;
var gravity 					: float = 20.0;
var startPos					: float = 0.0;
var moveDirection 				: int = 1;

var jumpParticle 				: Transform;

var soundJump 					: AudioClip;
var soundCrouch 				: AudioClip;

private var soundRate 			: float = 0.0;
private var soundDelay 			: float = 0.0;

var velocity 			: Vector3 = Vector3.zero;

private var jumpEnable 			: boolean = false;
private var runJumpEnable 		: boolean = false;
private var crouchJumpEnable 	: boolean = false;
private var afterHitForceDown 		: float =1.0;

function PlaySound(soundName, soundDelay)
{
	if(!audio.isPlaying && Time.time > soundDelay){
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
		yield WaitForSeconds( audio.clip.length );
	}
}

function Update()
{
	var pariclePalcement : Vector3 = Vector3(transform.position.x,transform.position.y-.5,0);
	
	var aniPlay = GetComponent("aniSprite");
	
	
	var controller : CharacterController = GetComponent(CharacterController);
	if(controller.isGrounded)
	{
		startPos = transform.position.y;
	
		jumpEnable = false;
		runJumpEnable = false;
		crouchJumpEnable = false;
	
	
		velocity = Vector3(Input.GetAxis("Horizontal") ,0,0);
		
		if(velocity.x == 0 && moveDirection == 1){//ideal left
			aniPlay.aniSprite(16,16,0,0,16,12);
		}
	
	
		if(velocity.x == 0 && moveDirection == 0)
		{//ideal right
			aniPlay.aniSprite(16,16,0,1,16,12);
		}
		
		//walk left side
		if(velocity.x < 0)
		{
			velocity *= walkSpeed;
			aniPlay.aniSprite(16,16,0,3,10,15);
		}
		
		//walk right side
		if(velocity.x > 0){
			velocity *= walkSpeed;
			aniPlay.aniSprite(16,16,0,2,10,15);
		}
		
		//run left side
		if(velocity.x < 0 && Input.GetButton("Fire1")){
			velocity *= runSpeed;
			aniPlay.aniSprite(16,16,0,5,16,24);
		}
		//run right side
		if(velocity.x > 0 && Input.GetButton("Fire1")){
			velocity *= runSpeed;
			aniPlay.aniSprite(16,16,0,4,16,24);
		}
		
		if( velocity.x == 0 && Input.GetAxis("Vertical") <0){
			if(moveDirection==0){
				velocity.x =0;
				aniPlay.aniSprite(16,16,0,9,16,24);
			}
			if(moveDirection==1){
				velocity.x =0;
				aniPlay.aniSprite(16,16,0,8,16,24);
			}
		}
		
		/*
		if(Input.GetAxis("Vertical") <0){
			velocity.x =0;
			if(moveDirection == 1)
			aniPlay.aniSprite(16,16,0,8,16,24);
			if(moveDirection==0)
			aniPlay.aniSprite(16,16,0,9,16,24);
		}*/
		
		if(Input.GetButtonDown("Jump") && (!Input.GetButton("Fire1") || Input.GetButton("Fire1") &&  velocity.x==0 ) && Input.GetAxis("Vertical")>=0  ){
			velocity.y = walkJump;
			Instantiate(jumpParticle,pariclePalcement,transform.rotation);
			PlaySound(soundJump,0);
			jumpEnable = true;
		}
		
		if(Input.GetButtonDown("Jump") && Input.GetButton("Fire1") && velocity.x != 0)
		{
			velocity.y = runJump;
			Instantiate(jumpParticle,pariclePalcement,transform.rotation);
			PlaySound(soundJump,0);
			runJumpEnable = true;
		}
		
		if(Input.GetButtonDown("Jump") && Input.GetAxis("Vertical")<0){
			velocity.y = crouchJump;
			Instantiate(jumpParticle,pariclePalcement,transform.rotation);
			PlaySound(soundCrouch,0);
			crouchJumpEnable = true;
		}
		
	} 
	
	if(!controller.isGrounded){
		velocity.x = Input.GetAxis("Horizontal");
		
		if(Input.GetButtonDown("Jump")){
			velocity.y -= fallSpeed;
		}
		
		if(moveDirection==0){
			if(jumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16,16,11,3,4,12);
			}
			
			if(runJumpEnable){
				velocity.x *= runSpeed;
				aniPlay.aniSprite(16,16,11,3,4,12);
			}
			
			if(crouchJumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16,16,12,11,4,12);
			}
		}
		if(moveDirection==1){
			if(jumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16,16,11,2,4,12);
			}
			if(runJumpEnable){
				velocity.x *= runSpeed;
				aniPlay.aniSprite(16,16,11,2,4,12);
			}
			if(crouchJumpEnable){
				velocity.x *= walkSpeed;
				aniPlay.aniSprite(16,16,12,10,4,12);
			}
		}
	}
	
	if(velocity.x <0 )
		moveDirection =0;
	
	if(velocity.x>0)
		moveDirection = 1;
	
	if(controller.collisionFlags == CollisionFlags.Above){
		velocity.y = 0;
		velocity.y -= afterHitForceDown;
	}
	
	velocity.y -= gravity * Time.deltaTime;
	
	controller.Move(velocity * Time.deltaTime);
}