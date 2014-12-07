// JavaScript Document
var c = document.getElementById("tree-canvas");
var ctx = c.getContext("2d");
var t=0;
var l=0;
function canvas()
{
	this.postion;
}

function Rectangle()
{
	this.position_top=700;
	this.position_left=100;
	this.top=t;
	this.bottom=50;
	this.left=l;
	this.right=90;
	var that=this;
	this.create=function(value,direction){
		
		ctx.rect(that.left,that.top,that.right,that.bottom);
		//ctx.fillText(value,30,30,20);
		console.log(that.left);
		t+=20;
		l+=20;
		ctx.stroke(); 
	}
}

function generateLine(val){
	//if(y==0)
	//clearInterval(p);
	ctx.moveTo(x,y);
	y-=20;
	x=x+20;
	ctx.lineTo(x,y);
	ctx.stroke();
}
function Line()
{
	
}



