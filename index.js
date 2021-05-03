const deepai = require('deepai');
const educate = require('./educate.js');
const nsfwneko = require('./nsfwneko.js');
const sfwneko = require('./sfwneko.js');
const liveneko = require('./liveneko.js');
const shibe = require('./shibe.js');
const weather = require('./weather.js');
const nuke = require('./nuke.js');
const whitelist = require('./whitelist.js');
const cat = require('./cat.js');
const nutrition = require('./nutrition.js');
const jaidenanimationr34 = require('./jaidenanimationr34.js')
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'c!';

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
  client.user.setActivity("c!help for my commands");
  liveneko.liveneko(client);
  whitelist.whitelist(client);
});

client.on('message', message => {
  message.content = message.content.toLowerCase();
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
      if (message.channel.nsfw === true || message.author.id === '469520953999753216') {
        educate.nuke(message);
      } else {
        message.channel.send('This command can only be run in a NSFW channel')
      }
    }

    if (command === 'nsfwneko') {
      if (message.channel.nsfw === true) {
        nsfwneko.neko(message);
      } else {
        message.channel.send('This command can only be run in a NSFW channel')
      }
    }

    if (command === 'sfwneko') {
      sfwneko.neko(message);
    }

    if (command === 'shibe') {
      shibe.shibe(message);
    }

    if (command === 'uwu') {
      nuke.nuke(message);
    }

    if (command === 'weather') {
      weather.weather(message, prefix);
    }

    if (command === 'jaidenanimationr34') {
      if (message.channel.nsfw) {
        jaidenanimationr34.jaidenanimationr34(message);
      } else {
        message.channel.send('This command can only be run in a NSFW channel')
      }
    }

    if (command === 'whitelist') {
      whitelist.add(message, args);
    }

    if (command === 'cat') {
      cat.cat(message);
    }

    if (command === 'nutrition') {
      nutrition.nutrition(message, prefix, args);
    }

    if (command === 'invite') {
      message.channel.send('Invite this bot to your sever with this link:\nhttps://discord.com/api/oauth2/authorize?client_id=784946150179864628&permissions=34816&scope=bot');
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
      let embed = new Discord.MessageEmbed()
        .setTitle("CheeseBot Commands")
        .setColor('#0000ff')
        .setDescription("Cheese Bot Commands")
        .addField("c!combine [Style Img link] [Content Img link]", "Combines two images.")
        .addField("c!generate [description]", "Generates anything (shit AI)")
        .addField("c!describe [Image URL]", "It describes the image you send")
        .addField("c!nutrition [item]", "Nutrition information")
        .addField("c!invite", "Link to invite this bot to your server")
        .addField("c!sfwneko", "SFW Neko")
        .addField("c!cat", "Self explanitory")
        .addField("c!shibe", "Sends images of shibes")
        .addField("c!weather [Location]", "Gives you the weather of a location")
        .addField("c!educate [victim] (NSFW)", "Sends them images...")
        .addField("c!nsfwneko (NSFW)", "c!sfwneko but its NSFW")
        .addField("c!jaidenanimationr34 (NSFW)", "...")
        .addField("SERVER: ", "https://discord.gg/45Yn9t2YXM")

      message.channel.send(embed);
    }
  }
});

client.login(process.env.TOKEN);