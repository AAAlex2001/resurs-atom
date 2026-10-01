from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import Response
from services.request_export import build_requests_docx

from dependencies import verify_api_key
from schemas.request import RequestIn, RequestOut
from services.email_notify import EmailNotificationService
from services.request import RequestService
from services.tg_notify import TelegramNotificationService

router = APIRouter(prefix="/request", tags=["request"])


@router.get('/export', dependencies=[Depends(verify_api_key)])
async def export_requests(request_service: RequestService = Depends()) -> Response:
    requests = await request_service.get_requests()
    return Response(
        content=build_requests_docx(requests),
        media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        headers={'Content-Disposition': 'attachment; filename="requests.docx"',
                 'Cache-Control': 'no-store'},
    )


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
    tg_notify_service: TelegramNotificationService = Depends(),
    email_notify_service: EmailNotificationService = Depends(),
) -> RequestOut:
    db_request = await request_service.create_request(request)
    await tg_notify_service.send_notification(db_request)
    await email_notify_service.send_notification(db_request)
    return db_request


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
    "/delete-request/{request_id}",
    summary="Удалить заявку по id",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
    description="Удалить заявку по id",
    dependencies=[Depends(verify_api_key)],
)
async def delete_request(
    request_id: int,
    request_service: RequestService = Depends(),
) -> None:
    deleted = await request_service.delete_request(request_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
