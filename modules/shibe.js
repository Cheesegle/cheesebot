const fetch = require('node-fetch');

function shibe(message) {
  let url = "http://shibe.online/api/shibes?count=1";

  let settings = { method: "Get" };

  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      message.channel.send({ files: [json[0]] }).catch(err => 1 + 1);
    })
    .catch(err => 1 + 1);
}

exports.shibe = shibe;