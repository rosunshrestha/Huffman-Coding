// JavaScript Document

var position;
var bottomPosition;
/*var c= new Canvas();
function Canvas() {
  */  var c = document.getElementById("tree-canvas");
	var ctx = c.getContext("2d");
	var t = 0;
	var positionX=50;
	bottomPosition=positionX;
	var positionY=c.height-100;
	//ctx.arc(20,20,5,0,Math.PI,);
	//ctx.stroke();
	var subTreePosition=new Array();
	var childTreePosition=new Array();
	
//}

function Rectangle() {
    //this.position_top = positionY-positionY/10;
    //this.position_left = positionX-positionX/10;
    this.top = positionY;
    this.bottom = this.top+20;;
    this.left = positionX;
    this.right = this.left+40;
   var that = this;
    this.create = function (value, direction,reference) {
		
		//if(direction==0)
		if(reference=="bottom")
		{			
			positionX=bottomPosition+70;
			positionY=c.height-100;
			if(direction==0)
			{positionX+=30;}
			bottomPosition=positionX;
			
		}
		else if(reference=="left")
		{
			position=subTreePosition.shift();	
			positionX=position[0]-100;
			positionY=position[1]-35;
			if(positionX<80)
			{
				//ctx.translate(positionX+(80-positionX),0);
			}
			
		}
		else if(reference=="right")
		{
			position=subTreePosition.shift();
			positionX=position[0]+50;
			positionY=position[1]-35;
		}
		//ctx.rect(that.left,that.top,that.right,that.bottom);
        //ctx.rect(50,340,90,400);
		
		ctx.rect(positionX,positionY,40,20);
        //ctx.rect(130,130,190,190);
   		ctx.fillStyle="#330066";
		ctx.stroke();
	     ctx.fillText(value,positionX+10,positionY+10,20);
	
		
		if(direction==1)
		{
				if(reference=="bottom")
				{
				positionY=that.top;
				positionX+=20;
				var rline=new Line();
				rline.create(1);
				positionX-=70;
				var lline=new Line();
				lline.create(0);
				positionX+=35;
				positionY-=35;
				}
			
				
					
				
		}
			if(reference=="left")
			{
				
				positionY+=50;
				positionX+=20;
				var rline=new Line();
				rline.create(3);
				positionX-=70;
				//var lline=new Line();
				//lline.create(4);
				positionX+=35;
				positionY-=35;
			}
			if(reference=="right")
			{
				positionY+=50;
				positionX+=20;
				var rline=new Line();
				rline.create(4);
				positionX-=70;
			}
			
			/*if(reference=="right")
			{
				positionY=that.top;
				positionX=-20;
				var rline=new Line();
				rline.create(5);
				positionX-=70;
				var lline=new Line();
				lline.create(6);
				positionX+=35;
				positionY-=35;	
			}*/
			
	}
}

function generateLine(val) {
    //if(y==0)
    //clearInterval(p);
    ctx.moveTo(x, y);
    y -= 20;
    x = x + 20;
    ctx.lineTo(x, y);
    ctx.stroke();
}
function Line() {
	this.top = t;
    this.bottom = 50;
    this.left = t;
    this.right = 90;
	this.create=function(direction,x,y){
		ctx.moveTo(positionX,positionY);
		if(direction==0)
		ctx.lineTo(positionX+35,positionY-50);
		else if(direction==1)
		ctx.lineTo(positionX-35,positionY-50);
		else if(direction==3)
		{
			ctx.moveTo(positionX,positionY-50);
			ctx.lineTo(positionX+35,positionY-100);
			ctx.moveTo(positionX+70,positionY-50);
			ctx.lineTo(positionX+35,positionY-100);
		}
		else if(direction==4)
		{
			ctx.moveTo(positionX,positionY-50);
			ctx.lineTo(positionX-35,positionY-100);
			ctx.moveTo(positionX-70,positionY-55);
			ctx.lineTo(positionX-35,positionY-100);
		}
		else if(direction==7)
		{
			var ldata=childTreePosition.shift();
			var rdata=childTreePosition.shift();
			console.log(ldata);
			console.log(rdata);
			ctx.moveTo(ldata[0],ldata[1]-40);
			ctx.lineTo(x,y-15);			
			ctx.moveTo(rdata[0],rdata[1]-40);
			ctx.lineTo(x,y-15);
		}
		ctx.stroke();
	}
}

function Circle(){
	this.top = t;
    this.bottom = 50;
    this.left = t;
    this.right = 90;
	this.create=function(value,reference){
		
		
		if(reference=="top")
		{
			positionNode1=subTreePosition.shift();
			positionNode2=subTreePosition.shift();
			childTreePosition.push(positionNode1);
			childTreePosition.push(positionNode2);		
			positionX=(positionNode1[0]+positionNode2[0])/2;
			if(positionNode1[1]>positionNode2[1])
			positionY=positionNode1[1]-100;	
			else
			positionY=positionNode2[1]-100;	
			
			var lline=new Line();
			lline.create(7,positionX,positionY);			
		}
		if(reference=="left")
		{
			//positionNode1=subTreePosition.shift();
			//childTreePoisiton.push(positionNode1);
			positionX=positionX+70;
			positionY-=50;
		}
			if(reference=="right")
		{
			//positionNode1=subTreePosition.shift();
			//childTreePoisiton.push(positionNode1);
			positionX=positionX+35;
			positionY-=85;
		}
		ctx.beginPath();
		ctx.arc(positionX,positionY-35,20,0,2*Math.PI);
		ctx.fillText(value,positionX,positionY-35,10);
		ctx.stroke();
		subTreePosition.push([positionX,positionY-15]);
		
		
	}
}

