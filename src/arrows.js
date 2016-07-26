import cats from './cats';
export var o = {
  _foo : 'Mur mur murmus',
  printFoo (){
  	cats.forEach(cat =>
		console.log(this._foo + cat)
	);
  }
};
