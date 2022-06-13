printjson(db.people.mapReduce(
	function() {
		emit(this.sex, {count : 1, weight : this.weight, height : this.height});
	},
	
	function(key, value) {
			reducedVal = { count : 0, weight : 0, height : 0 };
			for (var idx = 0; idx < value.length; idx++) {
				reducedVal.count += value[idx].count;
				reducedVal.weight += value[idx].weight;
				reducedVal.height += value[idx].height;
			}
			return reducedVal;
	},
	{
		out:{inline:1},
		finalize: function (key, value) {
			value.weight = value.weight/value.count;
			value.height = value.height/value.count;
			return value;
		}
	}
))