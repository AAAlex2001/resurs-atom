from contextlib import asynccontextmanager

from fastapi import FastAPI
from pydantic import BaseModel

from database import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()


app = FastAPI(title="Resurs Atom API", lifespan=lifespan)


class HealthResponse(BaseModel):
    status: str


@app.get("/")
def root() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/health")
def health() -> HealthResponse:
    return HealthResponse(status="healthy")
