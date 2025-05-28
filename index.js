require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

app.use(bodyParser.json())
// Basic Configuration
const port = process.env.PORT || 3000;
let urlList= []
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const regWeb = new RegExp("((http|https)://)(www.)?")

app.post("/api/shorturl", function(req, res) {
    if(regWeb.test(req.body.url)) {
      urlList.push({original_url: req.body.url, short_url: urlList.length+1})
      res.json(urlList[urlList.length-1])
    } else {
      console.log("nie ok ", req.body.url, regWeb.test(req.body.url))
      res.json( { error: 'invalid url' })
    }
   

})


app.get("/api/shorturl/:number", function(req, res) {
  console.log(urlList[0].short_url)
  for(let y = 0; y < urlList.length; y++ ) {
    console.log(y, urlList[y].short_url)


    if(req.params.number == urlList[y].short_url) {
      res.redirect(urlList[y].original_url)
    }
  // for(let x = req.params.number; x === urlList[y].short_url; x++ ) {
  //   console.log(
  //   urlList[x]

  //   )
  // }
}

  // res.redirect(urlList.original_url)
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
