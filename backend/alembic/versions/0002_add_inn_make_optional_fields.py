"""add inn, make activity/company/message optional

Revision ID: 0002
Revises: 0001
Create Date: 2026-06-18

"""
from typing import Sequence, Union

from alembic import op

revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE requests ALTER COLUMN activity DROP NOT NULL")
    op.execute("ALTER TABLE requests ALTER COLUMN company DROP NOT NULL")
    op.execute("ALTER TABLE requests ALTER COLUMN message DROP NOT NULL")
    op.execute("ALTER TABLE requests ADD COLUMN inn BIGINT")


def downgrade() -> None:
    op.execute("ALTER TABLE requests DROP COLUMN IF EXISTS inn")
    op.execute("ALTER TABLE requests ALTER COLUMN message SET NOT NULL")
    op.execute("ALTER TABLE requests ALTER COLUMN company SET NOT NULL")
    op.execute("ALTER TABLE requests ALTER COLUMN activity SET NOT NULL")
