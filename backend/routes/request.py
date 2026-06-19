from fastapi import APIRouter, Depends, HTTPException, Query, Security, status
from fastapi.security import APIKeyHeader

from database import settings
from schemas.request import RequestIn, RequestOut
from services.request import RequestService

api_key_header = APIKeyHeader(name="X-API-Key")


def verify_api_key(key: str = Security(api_key_header)):
    if key != settings.api_key:
        raise HTTPException(status_code=401, detail="Неверный ключ")


router = APIRouter(prefix="/request", tags=["request"])


@router.post(
    "/send-request",
    response_model=RequestOut,
    status_code=status.HTTP_201_CREATED,
    summary="Отправить запрос на контакт",
    description="Отправить запрос на контакт",
)
async def send_request(
    request: RequestIn,
    request_service: RequestService = Depends(),
) -> RequestOut:
    return await request_service.create_request(request)


@router.get(
    "/get-requests",
    response_model=list[RequestOut],
    summary="Получить все запросы",
    dependencies=[Depends(verify_api_key)],
)
async def get_requests(
    request_service: RequestService = Depends(),
) -> list[RequestOut]:
    return await request_service.get_requests()


@router.delete(
    "/delete-all-requests",
    summary="Удалить все запросы",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    description="Удалить все запросы",
    dependencies=[Depends(verify_api_key)],
)
async def delete_all_requests(
    request_service: RequestService = Depends(),
) -> None:
    await request_service.delete_all_requests()