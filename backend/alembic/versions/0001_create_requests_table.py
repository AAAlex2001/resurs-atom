"""create requests table

Revision ID: 0001
Revises:
Create Date: 2026-06-18

"""
from typing import Sequence, Union

from alembic import op

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TYPE activity AS ENUM (
            'Engineering',
            'Counstructing',
            'Operation',
            'Handling',
            'Transportation',
            'Ionizing',
            'Production',
            'Testing',
            'Subcontracting'
        )
    """)
    op.execute("""
        CREATE TABLE requests (
            id SERIAL PRIMARY KEY,
            name VARCHAR(350) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            email VARCHAR(255) NOT NULL,
            activity activity NOT NULL,
            company VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS requests")
    op.execute("DROP TYPE IF EXISTS activity")
