import cats from './cats';
export var o = {
  _foo : 'Mur mur mur ',
  printFoo (){
  	cats.forEach(cat => 
		console.log(this._foo + cat)
	);
  }
};
