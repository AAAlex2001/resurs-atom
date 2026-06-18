from fastapi import APIRouter, Depends, status

from schemas.request import RequestIn, RequestOut
from services.request import RequestService

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
    description="Получить все запросы",
)
async def get_requests(
    request_service: RequestService = Depends(),
) -> list[RequestOut]:
    return await request_service.get_requests()
