function* generator1(){
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

var iterable1 = generator1();

for(var item of iterable1) {
  item.then(value => console.log(value));
}
console.log('after');
