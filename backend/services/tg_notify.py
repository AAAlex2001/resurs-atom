import logging

import httpx
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, settings
from models.request import Request
from models.tg_notify import TgNotify


logger = logging.getLogger(__name__)

CHAT_IDS = 874275963, 1029270935, 877042619, 1216880927


class TelegramNotificationService:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def send_notification(self, db_request: Request) -> list[TgNotify]:
        lines = ["🔔 Новая заявка", ""]
        lines.append(f"Имя: {db_request.name}")
        lines.append(f"Телефон: {db_request.phone}")
        lines.append(f"Email: {db_request.email}")
        if db_request.activity:
            lines.append(f"Деятельность: {db_request.activity.value}")
        if db_request.company:
            lines.append(f"Компания: {db_request.company}")
        if db_request.inn:
            lines.append(f"ИНН: {db_request.inn}")
        if db_request.message:
            lines.append(f"Сообщение: {db_request.message}")
        message = "\n".join(lines)

        url = f"https://api.telegram.org/bot{settings.tg_bot_token}/sendMessage"
        transport = httpx.AsyncHTTPTransport(local_address="0.0.0.0")

        notifications = []
        async with httpx.AsyncClient(timeout=30, transport=transport) as client:
            for chat_id in CHAT_IDS:
                try:
                    response = await client.post(
                        url, json={"chat_id": chat_id, "text": message}
                    )
                    response.raise_for_status()
                    sent = True
                except httpx.HTTPError as e:
                    logger.warning("Telegram send failed for %s: %r", chat_id, e)
                    sent = False
                notifications.append(
                    TgNotify(chat_id=chat_id, message=message, sent=sent)
                )

        self.db.add_all(notifications)
        await self.db.commit()
        return notifications
