require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { deal, determineWinner, randomGameType } = require("./gameEngine");
const ton = require("./tonUtils"); // نُعرف أسفل

const bot = new Telegraf(process.env.BOT_TOKEN);

let rooms = {};  // حفظ الجولات المؤقتة

bot.start(ctx => ctx.reply("🎴 مرحبًا بـ JOKER! اكتب /play للانضمام للجولة"));

bot.command("play", async ctx => {
  const chatId = ctx.chat.id, user = ctx.from;
  if (!rooms[chatId]) rooms[chatId] = [];
  rooms[chatId].push(user);
  ctx.reply(`انضممت إلى الجولة (#${rooms[chatId].length}/4). ارسل /startgame عند اكتمال اللاعبين.`);
});

bot.command("startgame", async ctx => {
  const players = rooms[ctx.chat.id];
  if (!players || players.length < 2) return ctx.reply("يجب أن ينضم 2 لاعبين على الأقل.");
  
  const type = randomGameType(), hands = deal(players.length), winnerIndex = determineWinner(hands);
  const winner = players[winnerIndex];
  
  await ton.send(process.env.PLAYER_FEE, winner.id);
  
  ctx.reply(
    `اللعبة: ${type}\nالفائز هو: ${winner.first_name}\nتم إرسال الجائزة (باستثناء العمولة)`
  );
  rooms[ctx.chat.id] = [];  // إعادة تعيين الجولة
});

bot.launch();node bot.js
