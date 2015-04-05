var rotateCoinSpeed : float = 20.0;

function Update ()
{
	var aniPlay = GetComponent("aniSprite");
	aniPlay.aniSprite(16,2,0,0,21,rotateCoinSpeed);
}