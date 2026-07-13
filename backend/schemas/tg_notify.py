from datetime import datetime

from pydantic import BaseModel, Field


class TgRequestIn(BaseModel):
    chat_id: int = Field(..., description="Чат ID пользователя, кому отправляем сообщение")
    message: str = Field(..., description="Сообщение, которое отправляем в telegram пользователю")


class TgRequestOut(TgRequestIn):
    id: int = Field(..., description="ID записи в базе данных")
    sent: bool = Field(..., description="Было ли сообщение успешно отправлено")
    created_at: datetime = Field(..., description="Дата создания записи")

    class Config:
        from_attributes = True
