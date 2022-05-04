const config = require("./botconfig.json");
var Discord = require("discord.js");
var request = require("request");

const bot = new Discord.Client();

/* Outputs verification that the bot is active in the console
Sets the activity and status of the bot */
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);

  bot.user.setActivity("The game of life.", { type: "PLAYING" });
  bot.user.setStatus("idle");
});

bot.login(config.token);