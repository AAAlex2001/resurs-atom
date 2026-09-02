from collections.abc import AsyncGenerator

from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str
    api_key: str
    tg_bot_token: str
    smtp_host: str = "smtp.timeweb.ru"
    smtp_port: int = 465
    smtp_user: str
    smtp_password: str
    smtp_from: str = "info@atom-plus.pro"
    smtp_use_ssl: bool = True


settings = Settings()

engine = create_async_engine(settings.database_url, echo=False)

async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        yield session
