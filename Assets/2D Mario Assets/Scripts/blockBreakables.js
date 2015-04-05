var breakableTime 	: float = 2.5;
var soundBumpBreak 	: AudioClip;


function FixUpdate ()
{
	rigidbody.AddForce(Vector3.up * 250);
	BreakableWait();
	rigidbody.AddForce(Vector3.up * -200);
	Destroy(this.gameObject, breakableTime);
}

function Start(){
	audio.clip = soundBumpBreak;
	audio.Play();
}

function BreakableWait(){
	yield WaitForSeconds(breakableTime);
}