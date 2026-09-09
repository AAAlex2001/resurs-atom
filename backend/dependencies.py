import secrets
from uuid import UUID, uuid4

from fastapi import HTTPException, Request, Response, Security, status
from fastapi.security import APIKeyHeader

from database import settings

api_key_header = APIKeyHeader(name="X-API-Key")

VISITOR_COOKIE = "visitor_id"
VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365


def verify_api_key(key: str = Security(api_key_header)) -> None:
    if not secrets.compare_digest(key, settings.api_key):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный ключ")


def get_visitor_id(request: Request, response: Response) -> str:
    visitor_id = request.cookies.get(VISITOR_COOKIE)
    if visitor_id and is_uuid(visitor_id):
        return visitor_id

    visitor_id = str(uuid4())
    response.set_cookie(
        VISITOR_COOKIE,
        visitor_id,
        max_age=VISITOR_COOKIE_MAX_AGE,
        httponly=True,
        samesite="lax",
        secure=settings.cookie_secure,
        path="/",
    )

    return visitor_id


def is_uuid(value: str) -> bool:
    try:
        UUID(value)
    except ValueError:
        return False

    return True
