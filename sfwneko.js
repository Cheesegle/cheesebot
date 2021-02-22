const Danbooru = require('danbooru');
const fs = require('fs')

function neko(message) {
  const booru = new Danbooru()
  booru.posts({ tags: 'rating:safe cat_ears', limit: 200 }).then(posts => {
    const index = Math.floor(Math.random() * posts.length)
    const post = posts[index]
    const url = booru.url(post.file_url)
    fs.readFile('./catfacts.txt', function(err, data) {
      if (err) throw err;
      var lines = data.toString().split('\n');
      message.channel.send(lines[Math.floor(Math.random() * lines.length)], { files: [url.href] }).catch(err => 1 + 1)
    })
  })
}

exports.neko = neko;