from enum import Enum
from typing import Optional
from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime, Enum as SAEnum, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


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
    phone: Mapped[str] = mapped_column(String(20), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    activity: Mapped[Optional[Activity]] = mapped_column(
        SAEnum(Activity, values_callable=lambda obj: [e.name for e in obj]),
        nullable=True,
    )
    company: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    inn: Mapped[Optional[int]] = mapped_column(BigInteger, nullable=True)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    personal_data_consent: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    privacy_policy_accepted: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
