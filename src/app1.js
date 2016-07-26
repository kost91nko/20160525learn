
import cats from './cats';
import $ from 'jquery';
import './main.css';
import * as obj from './arrows.js';
import angular from 'angular';

$('<h1>Cats</h1>').appendTo('body');

const ul = $('<ul></ul>').appendTo('body');
for(const cat of cats){
	$('<li></li>').text(cat).appendTo(ul);
}

$('body').append('<button>Nuk</button>')

$('button').click(() => {
	alert("opanbki");
})

obj.o.printFoo();
console.log(angular);
