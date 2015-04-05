var imageGizmo : Texture;

function OnDrawGizmos(){
	if(!imageGizmo){
		Gizmos.DrawIcon(transform.position, "IconDefault");
	}
	else {
		Gizmos.DrawIcon(transform.position, imageGizmo.name);
	}	
}