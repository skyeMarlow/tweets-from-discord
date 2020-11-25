let Twitter = require('twitter');
let Discord = require('discord.js');
const Dclient = new Discord.Client();
//Yeah so I want to have a designated channel for me and my mods.
//If a mod types “hello” in he channel, a tweet will be created and sent saying “hello”

//put the secrets in another file!!!!!!!!!!!!!!!
let Tclient = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_KEY,
    access_token_secret: process.env.ACCESS_SECRET
  });

  Dclient.on('ready', () => {
    console.log(`Logged in as ${Dclient.user.tag}!` + ' Lets go!!!!!!!!!!!!');
});

Dclient.on('message', async message => {
    if(message.author.bot) {
      return;
    }
    //if(message.channel.id === '780970919803224095'){
    if (message.member.roles.cache.some(r => r.name === "Mod")){
    Tclient.post('statuses/update', {status: `${message.content}`}, function(error, tweet) {
        if (!error) {
        message.channel.send('Tweet Sent!');
        console.log(tweet);
        }
      });
    }
//  }
});

Dclient.login(process.env.BOT_TOKEN);