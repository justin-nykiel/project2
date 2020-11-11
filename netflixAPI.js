//Netflix API
const axios = require("axios").default;

const options = {
  method: 'GET',
  url: 'https://unogsng.p.rapidapi.com/search',
  params: {
    title: 'Ozark',
    limit: '5'
  },
  headers: {
    'x-rapidapi-key': 'b539ce6886msha8efc0821f59136p1adb65jsn88965d892229',
    'x-rapidapi-host': 'unogsng.p.rapidapi.com'
  }
};


axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


var unirest = require("unirest");

var req = unirest("GET", "https://unogsng.p.rapidapi.com/search");

req.query({
    "query":"office",
    "limit": "10",
    "countrylist": "78, 46",
    "orderby": "rating"
});

req.headers({
	"x-rapidapi-key": "b539ce6886msha8efc0821f59136p1adb65jsn88965d892229",
	"x-rapidapi-host": "unogsng.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});