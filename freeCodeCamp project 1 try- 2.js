// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api", function (req, res) {
  const d = new Date().toUTCString()
  const d1 = new Date()
  const t = d1.getTime()
  res.status(200).json({unix: t,  utc: d})
});

app.get('/api/:ans', (req,res) => {
  const rest = req.params.ans.split("-")
  let date = new Date(req.params.ans).toUTCString()
  let date2 = new Date(req.params.ans)
  console.log()

  if (!Number(date2) && !Number(req.params.ans)) {
    return res.status(404).json({error: "Invalid Date"})
  }

  else if (rest.length > 1) {

    // const dateString = (`${date[0]}, ${date[1]} ${date[2]} ${date[3]} 00:00:00 GMT`)
    const stamp = date2.getTime()
    let object = {unix: stamp, utc: date}
    return res.status(200).json(object)

  } else {
    let unixDate = new Date(Number(req.params.ans))
    unixDate = unixDate.toUTCString()
    // let dateStr = (`${unixDate[0]}, ${unixDate[1]} ${unixDate[2]} ${unixDate[3]} 00:00:00 GMT`)
    let object2 = {unix: Number(req.params.ans), utc: unixDate}
    return res.status(200).json(object2)

  }
})



// listen for requests :)
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port 5000');
});
