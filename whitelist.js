var list = [];

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

function whitelist(client, args) {
  client.on('guildMemberAdd', member => {
    if (member.guild.id === '752138183814283325') {
      if (list.includes(member.id) === true) {
        list.remove(member.id);
        client.channels.cache.get("752144200551891165").send('Welcome to Dredanarchy, <@' + member.id + '>');
      } else {
        member.ban({ reason: 'Not whitelisted' });
        client.channels.cache.get("752144200551891165").send(member.user.tag + ' has been automatically banned. (not whitelisted)');
      }
    }
  });
}

function add(message, args) {
  if (message.author.id === '469520953999753216') {
    list.push(args[0]);
    message.guild.members.unban(args[0]).catch(err => 1 + 1)
    message.channel.send('Whitelisted ' + args[0] + ', expires in 10 minutes.');
    setTimeout(function() {
      list.shift();
    }, 60000);
  }
}

exports.whitelist = whitelist;
exports.add = add;