printjson(db.people.mapReduce(
	function(){
		emit(this.job, this.job)
	},
	
	function(key, value){
		return key;
	},

	{out : {inline : 1}}
))