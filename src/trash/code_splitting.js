import _ from 'lodash'

require.ensure([], function(require){
	let cats = require('./cats');
	module.exports = cats;
})

