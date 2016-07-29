import Animal from './Animal.js';

export default class Squirrel extends Animal{
  constructor(name,age,color){
  	super(name, age);
  	this.color = color;
  }

  showInfo(){
  	super.showInfo();
  	console.log("This is quirel with color:" + this.color);
  }
}