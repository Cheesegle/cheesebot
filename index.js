const deepai = require('deepai');
const educate = require('./educate.js');
const neko = require('./neko.js');
const nutrition = require('./nutrition.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'c!'

deepai.setApiKey('a0a6774e-cb7d-46e3-b386-c34f8cf8b644');

imgc = async function(s, c) {
  var resp = await deepai.callStandardApi("neural-style", {
    style: s,
    content: c,
  });
  return resp.output_url
}

generatei = async function(d) {
  var resp = await deepai.callStandardApi("text2img", {
    text: d,
  });
  return resp.output_url
}

describei = async function(i) {
  var resp = await deepai.callStandardApi("neuraltalk", {
    image: i,
  });
  return resp.output
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'combine') {
      if (args.length !== 2) {
        return message.channel.send(`Usage: \`c!combine [style image link] [content image link]\``);
      }

      message.channel.send('Combining...');
      imgc(args[0], args[1])
        .then(res => {
          message.channel.send(res);
        }).catch(err => {
          message.channel.send('Error processing given input(s)');
        })
    }
    if (command === 'educate') {
      educate.nuke(message);
    }

    if (command === 'neko') {
      neko.neko(message);
    }

    if (command === 'nutrition') {
      nutrition.nutrition(message, prefix, args);
    }

    if (command === 'generate') {
      if (!args.length) {
        return message.channel.send(`Usage: \`c!generate [description]\``);
      }

      message.channel.send('Generating...');
      generatei(message.content.slice(prefix.length).trim())
        .then(res => {
          message.channel.send(res);
        }).catch(err => {
          message.channel.send('Error processing given input(s)');
        })
    }

    if (command === 'describe') {
      if (args.length !== 1) {
        return message.channel.send(`Usage: \`c!describe [image url]\``);
      }

      message.channel.send('Identifying...');
      describei(args[0])
        .then(res => {
          message.channel.send(res);
        }).catch(err => {
          message.channel.send('Error processing given input(s)');
        })
    }

    if (command === 'help') {
      message.channel.send(`My commands are: \`\`\`
c!combine [style image link] [content image link]
c!generate [description]
c!describe [image url]
c!educate [victim]
c!neko
c!nutrition [item]
\`\`\``);
    }
  }
});

client.login('Nzg0OTQ2MTUwMTc5ODY0NjI4.X8wsEQ.89TcXBdC0WVqelDRYaGv9ApvoYM');