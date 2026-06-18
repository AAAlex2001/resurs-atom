from fastapi import Depends
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
            message=request.message,
        )

        self.db.add(db_request)
        await self.db.flush()
        await self.db.commit()

        return db_request
