printjson(db.people.mapReduce(
	function(){
		this.credit.forEach( e => {emit(e.currency, {sum : parseFloat(e.balance), avg : parseFloat(e.balance)});})
	},
	
	function(key, value){
		return {sum : Array.sum(value.map(x => x.sum)), avg : Array.avg(value.map(x => x.avg))};
	},

	{
		out : {inline : 1},
		query : {nationality : 'Poland', sex: 'Female'}
	}
))