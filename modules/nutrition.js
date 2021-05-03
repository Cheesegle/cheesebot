var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
  appId: '7a407eb5',
  appKey: '6e71b3da64a05be1bf239123c7473e13	'
});
function nutrition(message, prefix) {
  let arg = message.content.slice(prefix.length + 9).trim()
  if (!arg.length) {
    return message.channel.send(`Usage: \`c!nutrition [item]\``);
  }

  nutritionix.natural(arg).then(function(r) {
    let n = '```';
    for (var i = 0; i < r.total.nutrients.length; i++) {
      if (Math.round(100 * r.total.nutrients[i].value) / 100 > 0) {
        n += '\n' + r.total.nutrients[i].name + ': ' + Math.round(100 * r.total.nutrients[i].value) / 100 + r.total.nutrients[i].unit
      }
      if (i === r.total.nutrients.length - 1) {
        n += '\n```'
        message.channel.send(n).catch(err => 1 + 1)

      }
    }
  })
    .catch(err => message.channel.send('Item not found').catch(err => 1 + 1));

}

exports.nutrition = nutrition;