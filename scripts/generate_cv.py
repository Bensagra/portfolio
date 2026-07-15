from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "benyamin-sagranichne-cv.pdf"

INK = colors.HexColor("#11120F")
PAPER = colors.HexColor("#F3F3EA")
MUTED = colors.HexColor("#5D6157")
LINE = colors.HexColor("#D2D5C8")
ACCENT = colors.HexColor("#C8FF3D")
WHITE = colors.HexColor("#F8F8F1")

styles = getSampleStyleSheet()

section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8,
    leading=10,
    textColor=INK,
    spaceBefore=4 * mm,
    spaceAfter=2.2 * mm,
    uppercase=True,
    tracking=1.2,
)

body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=11.2,
    textColor=MUTED,
    alignment=TA_LEFT,
    spaceAfter=2.2 * mm,
)

small_style = ParagraphStyle(
    "Small",
    parent=body_style,
    fontSize=7.3,
    leading=10,
    spaceAfter=1.4 * mm,
)

item_title_style = ParagraphStyle(
    "ItemTitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.2,
    leading=11,
    textColor=INK,
    spaceAfter=0.8 * mm,
)

meta_style = ParagraphStyle(
    "Meta",
    parent=styles["Normal"],
    fontName="Courier-Bold",
    fontSize=6.8,
    leading=8,
    textColor=MUTED,
    spaceAfter=1.2 * mm,
)

tag_style = ParagraphStyle(
    "Tags",
    parent=styles["Normal"],
    fontName="Courier",
    fontSize=6.6,
    leading=8.5,
    textColor=INK,
    backColor=colors.HexColor("#E3E6D9"),
    borderPadding=(2, 4, 2, 4),
    spaceAfter=3 * mm,
)


def section(title: str):
    return Paragraph(title.upper(), section_style)


def line_item(text: str):
    return Paragraph(f"<font color='#C8FF3D'>■</font>&nbsp;&nbsp;{text}", small_style)


def role(title: str, meta: str, description: str, tags: str | None = None):
    blocks = [
        Paragraph(title, item_title_style),
        Paragraph(meta.upper(), meta_style),
        Paragraph(description, body_style),
    ]
    if tags:
        blocks.append(Paragraph(tags, tag_style))
    return blocks


def draw_page(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)

    header_height = 43 * mm
    canvas.setFillColor(INK)
    canvas.rect(0, height - header_height, width, header_height, fill=1, stroke=0)

    left = 16 * mm
    top = height - 14 * mm

    canvas.setFillColor(ACCENT)
    canvas.rect(left, top - 8 * mm, 10 * mm, 10 * mm, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("Courier-Bold", 8)
    canvas.drawCentredString(left + 5 * mm, top - 4.5 * mm, "B/")

    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 22)
    canvas.drawString(left + 15 * mm, top - 1.5 * mm, "BENYAMIN SAGRANICHNE")
    canvas.setFillColor(ACCENT)
    canvas.setFont("Courier-Bold", 8)
    canvas.drawString(left + 15 * mm, top - 8 * mm, "BACKEND DEVELOPER")

    canvas.setFillColor(colors.HexColor("#A7AA9F"))
    canvas.setFont("Helvetica", 7.6)
    contact_y = height - 35 * mm
    canvas.drawString(left, contact_y, "Buenos Aires, Argentina")
    canvas.drawString(left + 48 * mm, contact_y, "bensagra@gmail.com")
    canvas.drawString(left + 94 * mm, contact_y, "github.com/Bensagra")
    canvas.drawString(left + 137 * mm, contact_y, "linkedin.com/in/benyamin-sagranichne")

    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(16 * mm, 12 * mm, width - 16 * mm, 12 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Courier", 6.5)
    canvas.drawString(16 * mm, 8 * mm, "PORTFOLIO 2026  /  BUILD - TEST - SHIP")
    canvas.drawRightString(width - 16 * mm, 8 * mm, "01")
    canvas.restoreState()


left_column = [
    section("Stack principal"),
    line_item("Node.js / TypeScript"),
    line_item("Python / REST APIs"),
    line_item("Prisma / PostgreSQL"),
    line_item("Supabase / Serverless"),
    line_item("React / Expo"),
    line_item("Flutter / Dart"),
    line_item("Git / CI-CD / Testing"),
    line_item("Arduino / Raspberry Pi"),
    section("Idiomas"),
    Paragraph("<b>Español</b><br/>Nativo", small_style),
    Paragraph("<b>Inglés</b><br/>Nivel C1", small_style),
    section("Educación"),
    Paragraph("<b>ORT - Sede Belgrano</b>", item_title_style),
    Paragraph("Bachiller en tecnología, información y comunicación<br/>2022 - 2026", small_style),
    section("Participación"),
    Paragraph("Diller Teen Fellows<br/>Madrij<br/>Modelos ONU<br/>Olimpíadas de matemática, informática y biología", small_style),
]

right_column = [
    section("Perfil"),
    Paragraph(
        "Developer en formación con foco en backend, automatización y productos digitales. "
        "Me gusta entender el problema completo, diseñar una solución clara y llevarla hasta "
        "una versión usable. Combino curiosidad técnica con comunicación, organización y trabajo en equipo.",
        body_style,
    ),
    section("Proyectos seleccionados"),
]

right_column.extend(
    role(
        "GO2 Robotics System",
        "2026  /  Robótica y visión computacional",
        "Arquitectura en tres capas para un robot Unitree GO2 con percepción, streaming de cámara, navegación y controles de seguridad entre edge, gateway y servidor.",
        "PYTHON  ·  WEBRTC  ·  COMPUTER VISION  ·  LIDAR",
    )
)
right_column.extend(
    role(
        "Food Catalog - Serverless App",
        "2026  /  Mobile y cloud",
        "Aplicación mobile con autenticación, catálogo y alta de productos. Incluye Supabase, tests unitarios, pruebas E2E y pipeline de CI-CD.",
        "TYPESCRIPT  ·  EXPO  ·  SUPABASE  ·  PLAYWRIGHT",
    )
)
right_column.extend(
    role(
        "Menta Café",
        "2025  /  Full stack e-commerce",
        "Producto en uso para una cafetería con catálogo, pedidos, cuentas de usuario y herramientas de administración.",
        "NODE.JS  ·  TYPESCRIPT  ·  PRISMA  ·  AUTH",
    )
)
right_column.extend(
    role(
        "Meirim Platform",
        "2026  /  Plataforma comunitaria",
        "Backend con roles, noticias, galería, productos, rankings, notificaciones push y migraciones de datos.",
        "JAVASCRIPT  ·  PRISMA  ·  SUPABASE  ·  JEST",
    )
)

right_column.append(section("Experiencia"))
right_column.extend(
    role(
        "Scraping App",
        "2025  /  Proyecto profesional",
        "Desarrollo de una aplicación web que consumía una API de scraping, procesaba datos públicos y los organizaba para reportes y análisis.",
    )
)
right_column.extend(
    role(
        "Guía - Museo Ana Frank",
        "2023 - 2025  /  Buenos Aires",
        "Oratoria, coordinación de visitantes y staff, capacitaciones y diseño de charlas para mejorar la experiencia del público.",
    )
)


def build():
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=48 * mm,
        bottomMargin=17 * mm,
        title="Benyamin Sagranichne - Backend Developer",
        author="Benyamin Sagranichne",
        subject="Curriculum vitae orientado a desarrollo de software",
    )

    columns = Table(
        [[left_column, right_column]],
        colWidths=[50 * mm, 121 * mm],
        hAlign="LEFT",
    )
    columns.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (0, 0), colors.HexColor("#E8EADF")),
                ("BOX", (0, 0), (0, 0), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (0, 0), 6 * mm),
                ("RIGHTPADDING", (0, 0), (0, 0), 6 * mm),
                ("TOPPADDING", (0, 0), (0, 0), 5 * mm),
                ("BOTTOMPADDING", (0, 0), (0, 0), 5 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 8 * mm),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (1, 0), (1, 0), 0),
                ("BOTTOMPADDING", (1, 0), (1, 0), 0),
            ]
        )
    )

    doc.build([columns, Spacer(1, 1)], onFirstPage=draw_page, onLaterPages=draw_page)


if __name__ == "__main__":
    build()
