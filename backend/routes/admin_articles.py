from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, status

from dependencies import verify_api_key
from schemas.articles import (
    ArticleAdminCardSchema,
    ArticleAdminSchema,
    ArticleCreateSchema,
    ArticleUpdateSchema,
    Section,
    TagAdminSchema,
    TagCreateSchema,
    UploadResultSchema,
)
from services.articles import ArticleService
from services.exceptions import ArticleNotFoundError, TagNotFoundError
from services.uploads import UploadError, save_article_image

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(verify_api_key)],
)


@router.get(
    "/articles",
    response_model=list[ArticleAdminCardSchema],
    summary="Все статьи, включая черновики",
)
async def list_articles(
    section: Section | None = Query(None, description="Раздел: blog или news"),
    service: ArticleService = Depends(),
) -> list[ArticleAdminCardSchema]:
    articles = await service.list_all(section)

    return [ArticleAdminCardSchema.model_validate(article) for article in articles]


@router.post(
    "/articles",
    response_model=ArticleAdminSchema,
    status_code=status.HTTP_201_CREATED,
    summary="Создать статью",
)
async def create_article(
    payload: ArticleCreateSchema,
    service: ArticleService = Depends(),
) -> ArticleAdminSchema:
    try:
        article = await service.create(payload)
    except TagNotFoundError as error:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(error)) from error

    return ArticleAdminSchema.model_validate(article)


@router.get(
    "/articles/{article_id}",
    response_model=ArticleAdminSchema,
    summary="Статья для редактирования",
)
async def get_article(
    article_id: int,
    service: ArticleService = Depends(),
) -> ArticleAdminSchema:
    try:
        article = await service.get_by_id(article_id)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    return ArticleAdminSchema.model_validate(article)


@router.patch(
    "/articles/{article_id}",
    response_model=ArticleAdminSchema,
    summary="Частичное обновление статьи",
)
async def update_article(
    article_id: int,
    payload: ArticleUpdateSchema,
    service: ArticleService = Depends(),
) -> ArticleAdminSchema:
    try:
        article = await service.get_by_id(article_id)
        article = await service.update(article, payload)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error
    except TagNotFoundError as error:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(error)) from error

    return ArticleAdminSchema.model_validate(article)


@router.delete(
    "/articles/{article_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=None,
    summary="Удалить статью",
)
async def delete_article(
    article_id: int,
    service: ArticleService = Depends(),
) -> None:
    try:
        article = await service.get_by_id(article_id)
    except ArticleNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error

    await service.delete(article)


@router.post(
    "/uploads",
    response_model=UploadResultSchema,
    status_code=status.HTTP_201_CREATED,
    summary="Загрузить изображение",
)
async def upload_image(file: UploadFile) -> UploadResultSchema:
    try:
        url = await save_article_image(file)
    except UploadError as error:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(error)) from error

    return UploadResultSchema(url=url)


@router.get("/tags", response_model=list[TagAdminSchema], summary="Теги с идентификаторами")
async def list_tags(service: ArticleService = Depends()) -> list[TagAdminSchema]:
    tags = await service.list_tags()

    return [TagAdminSchema.model_validate(tag) for tag in tags]


@router.post(
    "/tags",
    response_model=TagAdminSchema,
    status_code=status.HTTP_201_CREATED,
    summary="Создать тег",
)
async def create_tag(
    payload: TagCreateSchema,
    service: ArticleService = Depends(),
) -> TagAdminSchema:
    tag = await service.create_tag(payload.title)

    return TagAdminSchema.model_validate(tag)


@router.delete(
    "/tags/{tag_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=None,
    summary="Удалить тег",
)
async def delete_tag(tag_id: int, service: ArticleService = Depends()) -> None:
    try:
        await service.delete_tag(tag_id)
    except TagNotFoundError as error:
        raise HTTPException(status.HTTP_404_NOT_FOUND, str(error)) from error
