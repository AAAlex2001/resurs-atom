from enum import Enum

from sqlalchemy import DateTime, Enum as SAEnum, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base
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

class Request(Base):
    __tablename__ = "requests"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(350), nullable=False)
    phone: Mapped[str] = mapped_column(String(15), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    activity: Mapped[Activity] = mapped_column(
        SAEnum(Activity, values_callable=lambda obj: [e.name for e in obj]),
        nullable=False,
    )
    company: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)