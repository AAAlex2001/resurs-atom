import logging
from email.message import EmailMessage

import aiosmtplib
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db, settings
from models.request import Request

logger = logging.getLogger(__name__)

NOTIFY_EMAILS = (
    "vanyakin_oleg@mail.ru",
    "sasha_tolstov_2001@mail.ru",
    "i@aleksandramiller.ru",
    "av-expertiza@yandex.ru",
)


def build_request_message(db_request: Request) -> str:
    lines = ["Новая заявка с сайта atom-plus.pro", ""]
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
    return "\n".join(lines)


class EmailNotificationService:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def send_notification(self, db_request: Request) -> None:
        body = build_request_message(db_request)
        subject = f"Новая заявка: {db_request.name}"

        for recipient in NOTIFY_EMAILS:
            message = EmailMessage()
            message["From"] = settings.smtp_from
            message["To"] = recipient
            message["Subject"] = subject
            message.set_content(body)

            try:
                await aiosmtplib.send(
                    message,
                    hostname=settings.smtp_host,
                    port=settings.smtp_port,
                    username=settings.smtp_user,
                    password=settings.smtp_password,
                    use_tls=settings.smtp_use_ssl,
                )
            except Exception as e:
                logger.warning("Email send failed for %s: %r", recipient, e)
