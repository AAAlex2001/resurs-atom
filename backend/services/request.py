from fastapi import Depends
from sqlalchemy import select
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
            personal_data_consent=request.personal_data_consent,
            privacy_policy_accepted=request.privacy_policy_accepted,
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


    async def delete_request(self, request_id: int) -> bool:
        db_request = await self.db.get(Request, request_id)
        if db_request is None:
            return False
        await self.db.delete(db_request)
        await self.db.commit()
        return True

