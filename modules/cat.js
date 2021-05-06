const fetch = require('node-fetch');
const fs = require('fs')

function cat(message) {
  let url = "https://www.reddit.com/r/cats.json?limit=100";

  let settings = { method: "Get" };

  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      let c = [];
      for (var i = 0; i < json.data.children.length; i++) {
        if (json.data.children[i].data.url) {
          if (json.data.children[i].data.url.endsWith(".gif") === true || json.data.children[i].data.url.endsWith(".png") === true || json.data.children[i].data.url.endsWith(".jpg") === true) {
            c.push(json.data.children[i].data.url);
          }
        }
        if (i === json.data.children.length - 1) {
          fs.readFile('catfacts.txt', function(err, data) {
            if (err) throw err;
            var lines = data.toString().split('\n');
            message.channel.send(lines[Math.floor(Math.random() * lines.length)], { files: [c[Math.floor(Math.random() * c.length)]] }).catch(err => 1 + 1);
          })
        }
      }
    })
    .catch(err => 1 + 1);
}

exports.cat = cat;