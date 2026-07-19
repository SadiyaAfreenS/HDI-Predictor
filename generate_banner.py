from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 400
img = Image.new('RGBA', (W, H), (12, 20, 48, 255))
draw = ImageDraw.Draw(img)

# Background gradient
for y in range(H):
    t = y / H
    r = int(12 * (1 - t) + 70 * t)
    g = int(20 * (1 - t) + 40 * t)
    b = int(48 * (1 - t) + 140 * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# Glass panel
panel = Image.new('RGBA', (W, H), (0, 0, 0, 0))
pdraw = ImageDraw.Draw(panel)
pdraw.rounded_rectangle((70, 60, 1530, 340), radius=32, fill=(255, 255, 255, 26), outline=(255, 255, 255, 70), width=2)
img.alpha_composite(panel)

# Try to load fonts
try:
    title_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 52)
    subtitle_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 28)
    small_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 20)
    label_font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 16)
except Exception:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    small_font = ImageFont.load_default()
    label_font = ImageFont.load_default()

# Decorative AI circles
for x, y, r, c in [
    (260, 120, 28, (255, 255, 255)),
    (260, 120, 18, (95, 180, 255)),
    (250, 110, 8, (255, 255, 255)),
]:
    draw.ellipse((x - r, y - r, x + r, y + r), fill=c)

# Left text
text = 'HDI Predictor'
draw.text((90, 108), text, font=title_font, fill=(255, 255, 255, 255))
sub = 'Human Development Index Prediction System'
draw.text((90, 172), sub, font=subtitle_font, fill=(224, 234, 255, 255))
info = 'AI • Data Analytics • Modern UI • Human Development Insights'
draw.text((90, 223), info, font=small_font, fill=(188, 209, 255, 255))

# Charts / analytics illustration
points1 = [(760, 260), (835, 220), (910, 180), (1000, 220), (1080, 180), (1160, 220)]
points2 = [(760, 240), (840, 205), (930, 250), (1020, 215), (1110, 240)]
points3 = [(770, 220), (860, 260), (940, 205), (1030, 240), (1120, 215)]
for points in [points1, points2, points3]:
    for a, b in zip(points, points[1:]):
        draw.line([a, b], fill=(255, 255, 255, 220), width=3)
    for px, py in points:
        draw.ellipse((px - 5, py - 5, px + 5, py + 5), fill=(255, 255, 255, 255))

# Small stat cards
cards = [
    (1180, 100, 150, 80, 'HDI Score', '0.825'),
    (1340, 100, 140, 80, 'Impact', '+18%'),
    (1268, 210, 140, 80, 'Insights', 'AI'),
]
for x, y, w, h, label, value in cards:
    pdraw.rounded_rectangle((x, y, x + w, y + h), radius=16, fill=(255, 255, 255, 24), outline=(255, 255, 255, 70), width=1)
    draw.text((x + 16, y + 16), label, font=label_font, fill=(220, 232, 255, 255))
    draw.text((x + 16, y + 42), value, font=small_font, fill=(255, 255, 255, 255))

# Add a few floating dots
for x, y, r, c in [
    (1290, 80, 6, (120, 220, 255)),
    (1470, 80, 8, (140, 90, 255)),
    (1400, 270, 6, (70, 255, 190)),
]:
    draw.ellipse((x - r, y - r, x + r, y + r), fill=c)

img.save('banner.png')
print('Created banner.png')
