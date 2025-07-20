
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils import executor

API_TOKEN = 'YOUR_BOT_TOKEN'
bot = Bot7675016991:AAFHT2IQYDOn4_ENppHqV8vOIudwBQXs9hM
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    kb = InlineKeyboardMarkup().add(
        InlineKeyboardButton("🎮 Play JOKER", web_app=types.WebAppInfo(url="https://your-game-link"))
    )
    await message.reply("Welcome to JOKER! Start the game below:", reply_markup=kb)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
