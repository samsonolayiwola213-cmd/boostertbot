import { Telegraf } from 'telegraf';
import 'dotenv/config';

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('ERROR: BOT_TOKEN is not set. Add it to your .env file (locally) or Railway Variables (in production).');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// ---------- Commands ----------

bot.start((ctx) => {
  ctx.reply(
    `👋 Welcome, ${ctx.from.first_name}!\n\nI'm @boostertbot. Use /help to see what I can do.`
  );
});

bot.help((ctx) => {
  ctx.reply(
    [
      'Available commands:',
      '/start - Greet the bot',
      '/help - Show this help message',
      '/ping - Check if the bot is alive',
      '',
      "Anything else you send, I'll echo back for now.",
    ].join('\n')
  );
});

bot.command('ping', (ctx) => {
  ctx.reply('🏓 Pong! Bot is up and running.');
});

// ---------- Fallback: echo text ----------

bot.on('text', (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

// ---------- Error handling ----------

bot.catch((err, ctx) => {
  console.error(`Error while handling update ${ctx.updateType}:`, err);
});

// ---------- Launch ----------

bot.launch()
  .then(() => console.log('✅ boostertbot is running...'))
  .catch((err) => {
    console.error('Failed to launch bot:', err);
    process.exit(1);
  });

// Graceful shutdown (important for Railway restarts/redeploys)
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
