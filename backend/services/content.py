import nh3
from bs4 import BeautifulSoup
from slugify import slugify

ALLOWED_TAGS = {
    "p", "br", "hr",
    "h2", "h3", "h4",
    "strong", "b", "em", "i", "u", "s", "mark", "sup", "sub",
    "ul", "ol", "li",
    "a", "img", "figure", "figcaption",
    "blockquote", "code", "pre",
    "table", "thead", "tbody", "tr", "th", "td",
}

ALLOWED_ATTRIBUTES = {
    "a": {"href", "title", "target"},
    "img": {"src", "alt", "title", "width", "height"},
    "td": {"colspan", "rowspan"},
    "th": {"colspan", "rowspan"},
    "ol": {"start"},
}


def make_slug(text: str, max_length: int = 200) -> str:
    return slugify(text, max_length=max_length) or "article"


def sanitize_html(raw: str) -> str:
    return nh3.clean(
        raw,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        link_rel="noopener noreferrer",
    )


def prepare_content(raw: str) -> tuple[str, list[dict[str, str]]]:
    clean_html = sanitize_html(raw)
    soup = BeautifulSoup(clean_html, "html.parser")
    toc: list[dict[str, str]] = []
    used_anchors: set[str] = set()

    for heading in soup.find_all("h2"):
        title = heading.get_text(" ", strip=True)
        if not title:
            continue

        wanted_anchor = slugify(title, max_length=80) or "section"
        anchor = unique_anchor(wanted_anchor, used_anchors)
        used_anchors.add(anchor)

        heading["id"] = anchor
        toc.append({"id": anchor, "title": title})

    return str(soup), toc


def unique_anchor(base: str, used: set[str]) -> str:
    anchor = base
    suffix = 2

    while anchor in used:
        anchor = f"{base}-{suffix}"
        suffix += 1

    return anchor
