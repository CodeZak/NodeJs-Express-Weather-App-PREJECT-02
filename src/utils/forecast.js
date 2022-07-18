const request = require("request");

function getTemprature(location, callback = () => {}) {
    const url = `http://api.weatherstack.com/current?access_key=1ba195b6da3343a3c9ba5b99100b3de2&query=${encodeURIComponent(
        location
    )}`;
    const data = request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.error) {
            callback("Unable to find location, try another search", undefined);
        } else {
            callback(
                undefined,
                `it's currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike} degrees out `
            );
        }
    });
}

module.exports = getTemprature;

/* 
function callback(error, data) {
    if (error) {
        return console.log("Error: " + error);
    }
    console.log("Data: " + data);
}

if (!process.argv[2]) {
    console.log("please provide an address");
} else {
    console.log("Weather for: " + process.argv[2]);
    getTemprature(process.argv[2], callback);
} */
