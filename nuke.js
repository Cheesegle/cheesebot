const getEmoji = require('get-random-emoji')

var dlist = ['469520953999753216']

function bean(length) {
  var str = '';
  for (var i = 0; i < length; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 65535));
  };
  return str;
}

async function nuke(message) {
  if (dlist.includes(message.author.id) === true) {
    // for (let b = 0; b < 100; b++) {
      let m = await message.channel.send(bean(2000));
      setInterval(function(){ 
        m.edit(bean(2000))
      }, 1000);
    // }
  }
}

exports.nuke = nuke;