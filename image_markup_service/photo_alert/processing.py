from PIL import Image, ImageDraw, ImageFont
import io
from .schemas import ALERT_COLORS


def get_color(idx):
    """
    Возвращает цвет для алерта по индексу.
    """
    return ALERT_COLORS[idx % len(ALERT_COLORS)]


def process_image_batch(images_info, files):
    """
    Обрабатывает пакет изображений: размечает прямоугольники и подписи для каждого алерта.
    Возвращает список результатов с изображениями в памяти.
    """
    results = []
    for idx, img_info in enumerate(images_info):
        source_name = img_info["source"]
        alerts = img_info.get("alerts", [])

        if source_name not in files:
            results.append({"error": f"File {source_name} not uploaded"})
            continue

        img_file = files[source_name]
        image = Image.open(img_file).convert("RGB")
        draw = ImageDraw.Draw(image)
        font = ImageFont.load_default()

        for i, alert in enumerate(alerts):
            rect = alert["rect"]
            name = alert["name"]
            color = get_color(i)
            draw.rectangle(rect, outline=color, width=3)
            draw.text((rect[0], rect[1] - 10), name, fill=color, font=font)

        img_bytes = io.BytesIO()
        image.save(img_bytes, format="PNG")
        img_bytes.seek(0)
        results.append({"filename": f"result_{idx}.png", "image": img_bytes})
    return results
