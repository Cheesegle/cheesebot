const fetch = require('node-fetch');
var blist = [];
var slist = []

function nuke(message) {
  if (message.mentions.members.first()) {
    let victim = message.mentions.members.first().user;
    if (!blist.includes(victim.id)) {
      if (!slist.includes(message.author.id)) {
        let l = blist.length;
        blist.push(victim.id);
        slist.push(message.author.id);
        setTimeout(function() {
          blist.filter(function(v, i, a) {
            if (v === victim.id) {
              a.splice(i, 1)
            }
          });
        }, 3.6e+6);
        setTimeout(function() {
          slist.filter(function(s, i, a) {
            if (s === message.author.id) {
              a.splice(i, 1)
            }
          });
        }, 600000);

        let url = "https://www.reddit.com/r/furryporn.json?limit=100";

        let settings = { method: "Get" };

        fetch(url, settings)
          .then(res => res.json())
          .then((json) => {
            for (var i = 0; i < json.data.children.length; i++) {
              if (json.data.children[i].data.url) {
                if (json.data.children[i].data.url.endsWith(".gif") === true || json.data.children[i].data.url.endsWith(".png") === true || json.data.children[i].data.url.endsWith(".jpg") === true) {
                  victim.send({ files: [json.data.children[i].data.url] }).catch(err => 1 + 1)
                }
              }
            }
          })
          .catch(err => 1 + 1);

        message.channel.send(victim.tag + ' is now being *educated*')
      } else {
        message.channel.send('You can only educate someone someome every 10 minutes')
      }
    } else {
      message.channel.send('That user has already been educated in the past hour')
    }
  }
}

exports.nuke = nuke;