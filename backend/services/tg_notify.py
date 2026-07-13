import logging

import httpx
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, settings
from models.request import Request
from models.tg_notify import TgNotify


logger = logging.getLogger(__name__)

CHAT_ID = 874275963


class TelegramNotificationService:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def send_notification(self, db_request: Request) -> TgNotify:
        message = (
            f"Новая заявка от {db_request.name}. "
            f"Телефон: {db_request.phone}, Email: {db_request.email}, "
            f"Компания: {db_request.company}, Деятельность: {db_request.activity}, "
            f"ИНН: {db_request.inn}, Сообщение: {db_request.message}"
        )

        url = f"https://api.telegram.org/bot{settings.tg_bot_token}/sendMessage"
        transport = httpx.AsyncHTTPTransport(local_address="0.0.0.0")
        try:
            async with httpx.AsyncClient(timeout=10, transport=transport) as client:
                response = await client.post(
                    url, json={"chat_id": CHAT_ID, "text": message}
                )
                response.raise_for_status()
            sent = True
        except httpx.HTTPError as e:
            logger.warning("Telegram send failed: %r", e)
            sent = False

        notification = TgNotify(chat_id=CHAT_ID, message=message, sent=sent)
        self.db.add(notification)
        await self.db.commit()
        return notification
