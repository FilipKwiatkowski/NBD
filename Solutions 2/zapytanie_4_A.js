printjson(db.people.aggregate(
    [
        {$addFields: { bmi : { $multiply: [ {$divide : ["$weight", {$pow: ["$height", 2]}]}, 10000]}}},
        {$group : { _id : "$nationality", avg : { $avg : "$bmi"}, min : {$min : "$bmi"}, max : {$max : "$bmi"}}},
		{$sort: {_id : 1}}
    ]
).toArray());