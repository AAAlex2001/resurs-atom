"""create requests table

Revision ID: 0001
Revises:
Create Date: 2026-06-18

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    activity_enum = sa.Enum(
        "Проектирование и инжиниринг",
        "Строительство и монтаж",
        "Эксплуатация объектов",
        "Обращение с РМ и РАО",
        "Транспортирование и хранение",
        "Источники ионизирующего излучения",
        "Производство оборудования",
        "Испытания и пусконаладка",
        "Подряд в атомной отрасли",
        name="activity",
    )
    activity_enum.create(op.get_bind())

    op.create_table(
        "requests",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(350), nullable=False),
        sa.Column("phone", sa.String(15), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("activity", sa.Enum(name="activity"), nullable=False),
        sa.Column("company", sa.String(255), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=True),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("requests")
    sa.Enum(name="activity").drop(op.get_bind())
