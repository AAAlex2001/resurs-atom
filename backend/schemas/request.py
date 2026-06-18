from pydantic import BaseModel, Field, EmailStr
from enum import Enum
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
    name: str = Field(..., min_length=1, max_length=350, example="Иван Иванов", description="Имя и фамилия")
    phone: str = Field(..., min_length=10, max_length=15, example="+79999999999", description="Телефон")
    email: EmailStr = Field(..., example="ivan@example.com", description="Email")
    activity: Activity = Field(..., description="Вид деятельности")
    company: str = Field(..., min_length=1, max_length=255, example="ООО 'Тест'", description="Компания")
    message: str = Field(..., min_length=1, max_length=1000, example="Хочу заказать услугу", description="Сообщение")

class RequestOut(RequestIn):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True