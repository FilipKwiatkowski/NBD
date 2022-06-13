printjson(db.people.insert({
	sex : "Male",
	first_name : "Filip",
	last_name : "Kwiatkowski",
	job : "TA / Student",
	email : "s17137@pjwstk.edu.pl",
	location : {
		"city" : "Warsaw",
		"address" : {
			"streetname" : "Koszykowa",
			"streetnumber" : "86"
		}
	},
	"description" : "To nie ma tak, że jest dobrze, albo że niedobrze...",
	"height" : "187.00",
	"weight" : "100.00",
	"birth_date" : "1998-04-04T12:00:00Z",
	"nationality" : "Poland",
	"credit" : [
		{
			"type" : "Visa",
			"number" : "1234567890123",
			"currency" : "PLN",
			"balance" : "420692137.74"
		}
	]
	
}))