from PIL import Image
import os


def create_image(filename, color):
    img = Image.new("RGB", (256, 256), color=color)
    img.save(filename)
    img.close()


if __name__ == "__main__":
    os.makedirs("test_images", exist_ok=True)
    create_image("test_images/test1.png", (255, 200, 200))
    create_image("test_images/test2.png", (200, 255, 200))
    create_image("test_images/test3.png", (200, 200, 255))
    create_image("test_images/test4.png", (220, 220, 220))
