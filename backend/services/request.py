from fastapi import Depends
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.request import Request
from schemas.request import RequestIn


class RequestService:
    def __init__(self, db: AsyncSession = Depends(get_db)):
        self.db = db

    async def create_request(self, request: RequestIn) -> Request:
        db_request = Request(
            name=request.name,
            phone=request.phone,
            email=request.email,
            activity=request.activity,
            company=request.company,
            inn=request.inn,
            message=request.message,
        )

        self.db.add(db_request)
        await self.db.flush()
        await self.db.commit()

        return db_request

    async def get_requests(self) -> list[Request]:
        requests = await self.db.execute(
            select(Request)
            .order_by(Request.created_at.desc())
            )
        return requests.scalars().all()


    async def delete_all_requests(self) -> None:
        await self.db.execute(
            delete(Request)
        )
        await self.db.commit()

