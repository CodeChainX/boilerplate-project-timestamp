var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let unixTimestamp, utcString;

  if (dateParam) {
    unixTimestamp = parseInt(dateParam, 10);
    if (isNaN(unixTimestamp)) {
      return res.json({ error: 'Invalid Date' });
    }
    const dateObj = new Date(unixTimestamp);
    utcString = dateObj.toUTCString();
  } else {
    const now = new Date();
    unixTimestamp = now.getTime();
    utcString = now.toUTCString();
  }

  res.json({ unix: unixTimestamp, utc: utcString });
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
