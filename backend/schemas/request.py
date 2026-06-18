from pydantic import BaseModel, Field, EmailStr
from enum import Enum
from typing import Optional
from datetime import datetime


class Activity(str, Enum):
    Engineering = "Проектирование и инжиниринг"
    Counstructing = "Строительство и монтаж"
    Operation = "Эксплуатация объектов"
    Handling = "Обращение с РМ и РАО"
    Transportation = "Транспортирование и хранение"
    Ionizing = "Источники ионизирующего излучения"
    Production = "Производство оборудования"
    Testing = "Испытания и пусконаладка"
    Subcontracting = "Подряд в атомной отрасли"


class RequestIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=350, description="Имя")
    phone: str = Field(..., min_length=10, max_length=20, description="Телефон")
    email: EmailStr = Field(..., description="Email")
    activity: Optional[Activity] = Field(None, description="Вид деятельности")
    company: Optional[str] = Field(None, max_length=255, description="Компания")
    inn: Optional[int] = Field(None, ge=0, le=999999999999, description="ИНН")
    message: Optional[str] = Field(None, max_length=1000, description="Сообщение")


class RequestOut(RequestIn):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
