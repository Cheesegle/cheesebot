const weather = require('weather-js');
const Discord = require('discord.js');

function w(message, prefix) {
  let arg = message.content.slice(prefix.length + 7).trim()

  if (!arg.length) {
    return message.channel.send(`Usage: \`c!weather [location]\``);
  }

  weather.find({ search: arg, degreeType: 'F' }, function(err, result) {
    if (err) console.log(err);

    if (!result.length) {
      return message.channel.send(`Invalid input`);
    } else {
      let info = result[0]

      let embed = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle('Weather of ' + info.location.name)
        .setThumbnail(info.current.imageUrl)
        .addFields(
          { name: info.current.day + ' ' + info.current.observationtime, value: info.current.skytext },
          { name: 'Temperature', value: info.current.temperature + ' °F', inline: true },
          { name: 'Humidity', value: info.current.humidity + '%', inline: true },
          { name: 'Wind', value: info.current.winddisplay, inline: true }
        )
        .setTimestamp()

      message.channel.send(embed)
    }
  });
}

exports.weather = w;