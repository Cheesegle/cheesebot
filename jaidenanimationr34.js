var fetch = require('node-fetch');

function jaidenanimationr34(msg) {
  fetch("https://www.reddit.com/r/jaidenanimationr34.json?limit=100", { method: "Get" })
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
          msg.channel.send({ files: [c[Math.floor(Math.random() * c.length)]] }).catch(err => 1 + 1);
        }
      }
    })
}

exports.jaidenanimationr34 = jaidenanimationr34;