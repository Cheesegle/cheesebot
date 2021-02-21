const fetch = require('node-fetch');

function neko(message) {
  let url = "https://www.reddit.com/r/Nekomimi.json?limit=100";

  let settings = { method: "Get" };

  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      let nlist = [];
      for (var i = 0; i < json.data.children.length; i++) {
        if (json.data.children[i].data.url) {
          if (json.data.children[i].data.url.endsWith(".gif") === true || json.data.children[i].data.url.endsWith(".png") === true || json.data.children[i].data.url.endsWith(".jpg") === true) {
            nlist.push(json.data.children[i].data.url)
          }
        }
        if (i === json.data.children.length - 1) {
          message.channel.send({ files: [nlist[Math.floor(Math.random() * nlist.length)]] }).catch(err => 1 + 1)
        }
      }
    })
    .catch(err => 1 + 1);
}

exports.neko = neko;