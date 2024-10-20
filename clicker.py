from flask import Flask, render_template, request
import socket
import asyncio
import logging
from datetime import datetime
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardButton, WebAppInfo, InlineKeyboardMarkup, InlineKeyboardBuilder
from aiogram import Bot, Dispatcher, types, F, Router
from aiogram.enums.dice_emoji import DiceEmoji
from aiogram.filters.command import Command
from aiogram.types import FSInputFile

from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

logging.basicConfig(level=logging.INFO)
bot = Bot(token="7591968837:AAH1ld7t2AEflfz0wLnD7YN2_XuBGlH2mRA")
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    builder = InlineKeyboardBuilder()
    builder.row(types.InlineKeyboardButton(
        text="ТАПТАП", web_app=WebAppInfo(url=f"https://ramplerrsky.github.io/clicker.html"))
    )
    await message.answer("грустишь из за того что хомяка выебали? тапай в моем кликере! это намного пиздатее)))", reply_markup=builder.as_markup())

app = Flask(__name__)

@app.route('/')
def index():
    # Получаем локальный IP-адрес хоста
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    return render_template('clicker.html', ip_address=local_ip)

import requests

async def cmd_tap(message: types.Message):
    tap_count_response = requests.post('https://ramplerrsky.github.io/update_tap_count')
    tap_count = tap_count_response.json().get('message')

    await message.answer(f"Текущее количество тапов: {tap_count}")



async def main():
    # Запускаем обработку сообщений Telegram
    await dp.start_polling(bot)
    # Запускаем Flask-приложение в отдельном потоке
    loop = asyncio.get_event_loop()
    loop.create_task(app.run(debug=True, use_reloader=False))

if __name__ == '__main__':
    asyncio.run(main())
