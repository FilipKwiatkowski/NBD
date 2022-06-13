printjson(db.people.mapReduce(
	function(){
		var bmi = this.weight / (this.height * this.height) * 10000;
		emit(this.nationality, {avg : bmi, min : bmi, max : bmi, count : 1});
	},
	
	function(key, value){
		var res = {avg : 0, min : 100.0, max : 0.0, count : 0};
		
		value.forEach(e => {
			if(e.min < res.min) res.min = e.min;
			if(e.max > res.max) res.max = e.max;
		})
		
		for (var idx = 0; idx < value.length; idx++) {
			res.count += value[idx].count;
			res.avg += value[idx].avg;
		}
		
		return res;
	},

	{
		out : {inline : 1},
		finalize: function (key, value) {
			value.avg = value.avg/value.count;
			return value;
		}
	}
))