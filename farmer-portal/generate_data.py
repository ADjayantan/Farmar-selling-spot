import json
import random

categories = [
    {"id": 1, "name": "Fresh Fruits", "images": ["/images/fruits.png", "/images/tomato.png"]},
    {"id": 2, "name": "Vegetables", "images": ["/images/potato.png", "/images/onion.png", "/images/tomato.png"]},
    {"id": 3, "name": "Organic Produce", "images": ["/images/tomato.png", "/images/potato.png"]},
    {"id": 4, "name": "Spices & Herbs", "images": ["/images/onion.png"]},
    {"id": 5, "name": "Grains", "images": ["/images/fruits.png"]},
    {"id": 6, "name": "Dairy", "images": ["/images/potato.png"]},
    {"id": 7, "name": "Honey", "images": ["/images/fruits.png"]},
    {"id": 8, "name": "Baskets", "images": ["/images/onion.png"]}
]

locations = ["Dindigul, Tamil Nadu", "Mettupalayam Market", "Oddanchatram Market", "Salem, Tamil Nadu", "Coimbatore, Tamil Nadu", "Madurai Market", "Trichy, Tamil Nadu", "Erode, Tamil Nadu"]
sellers = ["Raja Farms", "Kumar Organics", "Senthil Produce", "Mani & Co", "Velu Farmers", "Karthik Agri", "Selvam Traders"]
adjectives = ["Fresh", "Organic", "Premium", "Farm-fresh", "Hand-picked", "Natural", "High Quality", "Export Grade"]

products = []
current_id = 1000

for cat in categories:
    for i in range(35):
        current_id += 1
        adj = random.choice(adjectives)
        loc = random.choice(locations)
        seller = random.choice(sellers)
        img = random.choice(cat["images"])
        
        if cat["name"] == "Fresh Fruits":
            title = f"{adj} {random.choice(['Mangoes', 'Bananas', 'Papaya', 'Guava', 'Pomegranates', 'Grapes', 'Watermelon'])}"
            price = f"? {random.randint(40, 150)} / kg"
        elif cat["name"] == "Vegetables":
            title = f"{adj} {random.choice(['Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Cabbage', 'Cauliflower', 'Brinjal'])}"
            price = f"? {random.randint(20, 80)} / kg"
        elif cat["name"] == "Organic Produce":
            title = f"{adj} Organic {random.choice(['Spinach', 'Moringa', 'Tomatoes', 'Turmeric', 'Ginger'])}"
            price = f"? {random.randint(60, 200)} / kg"
        elif cat["name"] == "Spices & Herbs":
            title = f"{adj} {random.choice(['Black Pepper', 'Cardamom', 'Coriander Seeds', 'Dry Red Chillies', 'Turmeric Fingers'])}"
            price = f"? {random.randint(200, 1500)} / kg"
        elif cat["name"] == "Grains":
            title = f"{adj} {random.choice(['Ponni Rice', 'Basmati Rice', 'Millets', 'Ragi', 'Wheat', 'Maize'])}"
            price = f"? {random.randint(2000, 6000)} / quintal"
        elif cat["name"] == "Dairy":
            title = f"{adj} {random.choice(['Cow Milk', 'Buffalo Milk', 'Country Ghee', 'Fresh Paneer', 'Butter'])}"
            price = f"? {random.randint(50, 800)} / liter"
        elif cat["name"] == "Honey":
            title = f"{adj} {random.choice(['Wild Forest Honey', 'Neem Honey', 'Moringa Honey', 'Raw Comb Honey'])}"
            price = f"? {random.randint(400, 1200)} / kg"
        elif cat["name"] == "Baskets":
            title = f"{adj} {random.choice(['Bamboo Basket', 'Palm Leaf Basket', 'Cane Basket', 'Jute Bags'])}"
            price = f"? {random.randint(100, 500)} / piece"
            
        products.append({
            "id": str(current_id),
            "categoryId": cat["id"],
            "title": title,
            "price": price,
            "location": loc,
            "year": random.choice(["Harvested Today", "Fresh Stock", "Ready to dispatch", "Dry & Good Size", "New Arrival"]),
            "image": img,
            "seller": seller,
            "desc": f"{title} available directly from the farm at {loc}. We ensure the highest quality and fair pricing. Contact {seller} for bulk orders and negotiations."
        })

ts_content = f'''export const mockProducts = {json.dumps(products, indent=2)};

export const getProductById = (id: string) => mockProducts.find(p => p.id === id);
export const getProductsByCategory = (categoryId: number) => mockProducts.filter(p => p.categoryId === categoryId);
'''

with open('src/data/mockProducts.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Generated {len(products)} products.")
