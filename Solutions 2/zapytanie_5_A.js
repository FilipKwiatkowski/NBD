printjson(db.people.aggregate(
		{$unwind : "$credit"},
		{$match : {sex: "Female", nationality : "Poland"}},
        {$group : { _id : "$credit.currency", sum : {$sum : { $toDouble : "$credit.balance" }}, avg : {$avg : { $toDouble : "$credit.balance" }}}},
		{$sort : {_id : 1}}
).toArray());