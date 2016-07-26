export default class Animal{
	constructor(name, age){
		this.name = name;
		this.age = age
	}

	showInfo() {
		console.log('Name: ' + this.name + ' Age:' + this.age);
	}

	static bornNew(){
		return new this('vasya', 1)
	}
}