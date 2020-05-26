const util = require('util');
const Sentencer = require('sentencer');
const gis = require('g-i-s');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const gisPromise = util.promisify(gis);

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/getNounImage', function (req, res) {
    var noun = Sentencer.make("{{ noun }}");
    gisPromise(noun)
        .then(data => res.send(JSON.stringify([noun, data[0].url], null, ' ')))
        .catch(err => console.log(err));
});


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');