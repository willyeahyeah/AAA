/**
 * How to upload Image in Node JS and Handle File Size, Type with Multer
 * https://www.jsmount.com/upload-image-in-node-js-with-multer/
 */

const cors = require('cors')
const http = require('http')
// const https = require('https')
// const compression = require('compression')
// const os = require( 'os' )
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
// const fs = require('fs')

function getLocalIp() {
  const os = require('os')
  for (let addresses of Object.values(os.networkInterfaces())) {
    for (let add of addresses) {
      if (add.address.startsWith('10.')) {
        return add.address;
      }
    }
  }
}

const eth1 = getLocalIp( )

// const credentials = {
//   key: fs.readFileSync('./10.0.1.201.key', 'utf8'),
//   cert: fs.readFileSync('./10.0.1.201.crt', 'utf8')
// }

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '/../build/')))
app.use(express.static(path.join(__dirname, '/../html/')))

// app.get('/api/v1/allocation/:id', function(req, res) {
//   console.log('44:Get allocation:id:', req.params.id);

//   let file;

//   if (req.params.id == 1) {
//     file = 'allocation.json';
//   }

//   res.status(200);

//   fs.readFile(file, 'utf8' , (err, data) => {
//     if (err) {
//       console.error(err)
//     }
//     console.log(data)
//     res.send(data);
//   })

// });

// const parsedata = multer();

// app.post('/api/v1/allocation', parsedata.array(), async (req, res) => {
//   console.log('67:updating allocaton: /api/v1/allocation');
//   console.log('68:req.body', req.body);
  // console.log('69:req.query', req.query);
  // console.log('70:req.params', req.params);

  // const delta = JSON.parse(decodeURIComponent(req.body.delta));
  // console.log('delta', delta);

  // fs.writeFile('output.txt', JSON.stringify(delta, null, ' '), function (err) {
  //   if (err) return console.log(err);
  //   console.log('Delta saved!');
  // });

  // res.status(200);

  // fs.readFile('allocation.json', 'utf8' , (err, data) => {
  //   if (err) {
  //     console.error(err)
  //   }
  //   res.send(data);
  //   res.send('{"date":"2021-july", "locaton": "hong kong"}');
  // });

// });

var httpServer = http.createServer(app)
.listen(8080, eth1, () => {
  console.log('HTTP server starting', httpServer.address());
})

// var httpsServer = https.createServer(credentials, app)
// .listen(8043, eth1, () => {
//   console.log("HTTPS server starting", httpsServer.address())
// })

// nodemon index.js
