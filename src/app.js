import 'babel-polyfill';
import cats from './cats';
import $ from 'jquery';
import './style.css';
import './main.css';
import * as obj from './arrows.js';

$('<h1>Cats</h1>').appendTo('body');

const ul = $('<ul></ul>').appendTo('body');
for(const cat of cats){
	$('<li></li>').text(cat).appendTo(ul);
}

$('body').append('<button>Nuka clickni</button>')

$('button').click(() => {
	alert("opanbki");
})

obj.o.printFoo();