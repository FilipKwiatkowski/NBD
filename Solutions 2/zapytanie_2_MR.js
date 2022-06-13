printjson(db.people.mapReduce(
	function() {
		this.credit.forEach( e =>{emit(e.currency, parseFloat(e.balance));})
	},
	
	function(key, value){
		return Array.sum(value);
	},

	{out : {inline : 1}}
))