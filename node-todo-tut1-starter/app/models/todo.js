var mongoose = require('mongoose');

module.exports = mongoose.model('city', {
	a : String,
	dist : Number,
	done : Boolean
});