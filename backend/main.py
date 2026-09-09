from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from database import engine, settings

from routes.admin_articles import router as admin_articles_router
from routes.articles import router as articles_router
from routes.request import router as request_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()


app = FastAPI(title="Resurs Atom API", lifespan=lifespan)

app.include_router(request_router)
app.include_router(articles_router)
app.include_router(admin_articles_router)

Path(settings.media_dir).mkdir(parents=True, exist_ok=True)
app.mount("/media", StaticFiles(directory=settings.media_dir), name="media")


class HealthResponse(BaseModel):
    status: str


@app.get("/")
def root() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/health")
def health() -> HealthResponse:
    return HealthResponse(status="healthy")
