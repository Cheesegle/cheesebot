const Danbooru = require('danbooru');
const fs = require('fs')
var lastneko = '';
var g = 0;

function liveneko(client) {
  setInterval(function() {
    const booru = new Danbooru()
    booru.posts({ tags: 'cat_ears', limit: 1 }).then(posts => {
      let post = posts[0]
      if (post.id !== lastneko) {
        lastneko = post.id;
        g++;
        if (g > 1) {
          const url = booru.url(post.file_url)
          client.channels.cache.get('813493291366088805').send({ files: [url.href] });
        }
      }
    })
  }, 1000);
}

exports.liveneko = liveneko;