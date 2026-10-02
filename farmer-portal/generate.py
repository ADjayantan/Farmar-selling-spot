from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs('public/images', exist_ok=True)

colors = {'tractor': (255, 165, 0), 'seeds': (34, 139, 34), 'rice': (218, 165, 32), 'land': (139, 69, 19)}
texts = {'tractor': 'Tractor Image', 'seeds': 'Seeds Image', 'rice': 'Rice Bags', 'land': 'Farm Land'}

for key in colors:
    img = Image.new('RGB', (300, 200), color = colors[key])
    d = ImageDraw.Draw(img)
    d.text((50, 90), texts[key], fill=(255, 255, 255))
    img.save(f'public/images/{key}.png')
