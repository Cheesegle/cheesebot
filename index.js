const deepai = require('deepai');
require('dotenv').config();
const educate = require('./modules/educate.js');
const nsfwneko = require('./modules/nsfwneko.js');
const sfwneko = require('./modules/sfwneko.js');
const liveneko = require('./modules/liveneko.js');
const shibe = require('./modules/shibe.js');
const weather = require('./modules/weather.js');
const whitelist = require('./modules/whitelist.js');
const cat = require('./modules/cat.js');
const nutrition = require('./modules/nutrition.js');
const jaidenanimationr34 = require('./modules/jaidenanimationr34.js')
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'c!';

deepai.setApiKey(process.env.APIKEY);

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

generatet = async function(d) {
  var resp = await deepai.callStandardApi("text-generator", {
    text: d,
  });
  return resp.output
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

    switch (command) {
      case 'combine':
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
        break;
      case 'educate':
        if (message.channel.nsfw === true || message.author.id === '469520953999753216') {
          educate.nuke(message);
        } else {
          message.channel.send('This command can only be run in a NSFW channel')
        }
        break;
      case 'nsfwneko':
        if (message.channel.nsfw === true) {
          nsfwneko.neko(message);
        } else {
          message.channel.send('This command can only be run in a NSFW channel')
        }
        break;
      case 'sfwneko':
        sfwneko.neko(message);
        break;
      case 'shibe':
        shibe.shibe(message);
        break;
      case 'weather':
        weather.weather(message, prefix);
        break;
      case 'jaidenanimationr34':
        if (message.channel.nsfw) {
          jaidenanimationr34.jaidenanimationr34(message);
        } else {
          message.channel.send('This command can only be run in a NSFW channel')
        }
        break;
      case 'whitelist':
        whitelist.add(message, args);
        break;
      case 'generate':
        message.channel.send('This command has been replaced with c!generatetext and c!generateimage');
        break;
      case 'cat':
        cat.cat(message);
        break;
      case 'nutrition':
        nutrition.nutrition(message, prefix, args);
        break;
      case 'invite':
        message.channel.send('Invite this bot to your sever with this link:\nhttps://discord.com/api/oauth2/authorize?client_id=784946150179864628&permissions=34816&scope=bot');
        break;
      case 'generateimage':
        if (!args.length) {
          return message.channel.send(`Usage: \`c!generateimage [description]\``);
        }

        message.channel.send('Generating...');
        generatei(message.content.slice(prefix.length + command.length).trim())
          .then(res => {
            message.channel.send(res);
          }).catch(err => {
            message.channel.send('Error processing given input(s)');
          })
        break;
      case 'generatetext':
        if (!args.length) {
          return message.channel.send(`Usage: \`c!generateimage [prompt]\``);
        }

        message.channel.send('Generating...');
        generatet(message.content.slice(prefix.length + command.length).trim())
          .then(res => {
            message.channel.send(res);
          }).catch(err => {
            message.channel.send('Error processing given input(s)');
          })
        break;
      case 'describe':
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
        break;
      case 'help':
      default:
        let embed = new Discord.MessageEmbed()
          .setTitle("CheeseBot Commands")
          .setColor('#0000ff')
          .setDescription("Cheese Bot Commands")
          .addField("c!combine [Style Img link] [Content Img link]", "Combines two images.")
          .addField("c!generateimage [description]", "Generates images (shit AI)")
          .addField("c!generatetext [prompt]", "Generates text")
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