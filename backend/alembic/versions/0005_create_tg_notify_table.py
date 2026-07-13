"""create tg_notify table

Revision ID: 0005
Revises: 0004
Create Date: 2026-07-13

"""
from typing import Sequence, Union

from alembic import op

revision: str = "0005"
down_revision: Union[str, None] = "0004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE tg_notify (
            id SERIAL PRIMARY KEY,
            chat_id BIGINT NOT NULL,
            message TEXT NOT NULL,
            sent BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMP NOT NULL DEFAULT now()
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS tg_notify")
