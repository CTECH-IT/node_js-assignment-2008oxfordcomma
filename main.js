"use strict";

const config = require("./botconfig.json");
const Discord = require("discord.js");
const request = require("request");
const embedColor = 4166633;

const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);

  bot.user.setActivity("The game of life.", { type: "PLAYING" });
  bot.user.setStatus("idle");
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray[1]; //
  let Nargs = messageArray[2];

  if (cmd == `${prefix}h` || cmd == `${prefix}help`) {
    let sEmbed = new Discord.RichEmbed()
      .setColor(embedColor)
      .setTitle("Commands")
      .setFooter("Contact Dreyfus Harmonious#3606 with any issues")
      .addField(
          "\n `!r   ? :` **Random post** *[top 100 of all time]*" +
          "\n `!rtm ? :` **Random post** *[top 100 of this month]*" +
          "\n `!h     :` **Help**"
      );
	  message.channel.send({ embed: sEmbed });
  }

  if (cmd == `${prefix}r`) {
    request(
      "https://www.reddit.com/r/" + args + "/top/.json?t=all&limit=100",
      function (error, response, body) {
        let json = JSON.parse(body);
        try {
          if (isNaN(Nargs)) {
            Nargs = 1;
          }
          const maxReps = Math.min(Number(Nargs), 10);
          for (let i = 0; i < Number(maxReps); i++) {
            let randNum = Math.floor(Math.random() * 100 + 0);
            let imgURL = json["data"]["children"][randNum]["data"]["url"]; // sets up the image url which can be requested
            let title = json["data"]["children"][randNum]["data"]["title"]; // also sets up the title that we will display with the post
            let redditLink = json["data"]["children"][randNum]["data"]["permalink"]; // gets the real reddit link we will use 
            request(imgURL, function (err, response, body) {
              let finalURL = response.request.href;
              let reEmbed = new Discord.RichEmbed()
                .setColor(embedColor)
                .addField(
                  "r **" + args + " x" + maxReps + "**",
                  "[" + title + "](" + "https://reddit.com" + redditLink + ")",
                  true
                );
              message.channel.send({ embed: reEmbed });
              return message.channel.send(finalURL);
            });
          }
        } catch {
          if (args === void 0) {
            let reEmbed = new Discord.RichEmbed()
              .setColor(embedColor)
              .setTitle("You must specify a subreddit!");
            return message.channel.send({ embed: reEmbed });
          } else {
            let reEmbed = new Discord.RichEmbed()
              .setColor(embedColor)
              .setTitle("Error getting data from " + args)
              .setDescription(
                "This subreddit doesn't exist, or it has less than 100 posts in it"
              );
            return message.channel.send({ embed: reEmbed });
          }
        }
      }
    );
  }

  if (cmd == `${prefix}rtm`) {
    request(
      "https://www.reddit.com/r/" + args + "/top/.json?t=month&limit=100",
      function (error, response, body) {
        let json = JSON.parse(body);
        try {
          if (isNaN(Nargs)) {
            Nargs = 1;
          }
          const maxReps = Math.min(Number(Nargs), 10);
          for (let i = 0; i < Number(maxReps); i++) {
            let randNum = Math.floor(Math.random() * 100 + 0);
            let imgURL = json["data"]["children"][randNum]["data"]["url"];
            let title = json["data"]["children"][randNum]["data"]["title"];
            let redditLink = json["data"]["children"][randNum]["data"]["permalink"];
            request(imgURL, function (err, response, body) {
              let finalURL = response.request.href;
              let reEmbed = new Discord.RichEmbed()
                .setColor(embedColor)
                .addField(
                  "rtm **" + args + " x" + maxReps + "**",
                  "[" + title + "](" + "https://reddit.com" + redditLink + ")",
                  true
                );
              message.channel.send({ embed: reEmbed });
              return message.channel.send(finalURL);
            });
          }
        } catch {
          if (args === void 0) {
            let reEmbed = new Discord.RichEmbed()
              .setColor(embedColor)
              .setTitle("You must specify a subreddit!");
            return message.channel.send({ embed: reEmbed });
          } else {
            let reEmbed = new Discord.RichEmbed()
              .setColor(embedColor)
              .setTitle("Error getting data from " + args)
              .setDescription(
                "This subreddit doesn't exist, or it has less than 100 posts in the last month"
              );
            return message.channel.send({ embed: reEmbed });
          }
        }
      }
    );
  }
});
bot.login(config.token);
