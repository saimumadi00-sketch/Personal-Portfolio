"""Regenerate optimized portrait and social card assets with Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

root = Path(__file__).resolve().parent.parent
portrait = Image.open(root / 'public/portrait.png').convert('RGB')
for width in (320, 640):
    copy = portrait.copy()
    copy.thumbnail((width, width * 2), Image.Resampling.LANCZOS)
    copy.save(root / f'public/portrait-{width}.webp', 'WEBP', quality=82, method=6)

card = Image.new('RGB', (1200, 630), '#102840')
draw = ImageDraw.Draw(card)
draw.rectangle((0, 0, 12, 630), fill='#67beff')
fonts = Path('/usr/share/fonts/truetype/dejavu')
bold = ImageFont.truetype(str(fonts / 'DejaVuSans-Bold.ttf'), 48)
normal = ImageFont.truetype(str(fonts / 'DejaVuSans.ttf'), 27)
small = ImageFont.truetype(str(fonts / 'DejaVuSans.ttf'), 23)
draw.text((60, 155), 'Saimum Al-Mahmud', font=bold, fill='#ffffff')
draw.text((60, 235), 'Cybersecurity & Networking', font=normal, fill='#8bd0ff')
draw.text((60, 285), 'CSE | North South University, Dhaka', font=small, fill='#c6d7ec')
draw.text((60, 365), 'Network defense. Applied projects.', font=normal, fill='#ffffff')
draw.text((60, 460), 'saimum-aditto.vercel.app', font=small, fill='#c6d7ec')
photo = ImageOps.fit(portrait, (330, 480), Image.Resampling.LANCZOS, centering=(0.5, 0.3))
card.paste(photo, (825, 75))
card.save(root / 'public/social-preview.png', optimize=True)
print('Optimized portrait and social-preview assets generated.')
