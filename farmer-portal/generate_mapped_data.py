import json
import random

locations = ["Dindigul", "Mettupalayam", "Oddanchatram", "Salem", "Coimbatore", "Madurai", "Trichy", "Erode"]
sellers = ["Raja Farms", "Kumar Organics", "Senthil Produce", "Mani & Co", "Velu Farmers", "Karthik Agri", "Selvam Traders"]
adjectives = ["Fresh", "Organic", "Premium", "Farm-fresh", "Hand-picked", "Natural", "High Quality", "Export Grade"]

# Mapping specific products to their actual images
product_templates = {
    1: [ # Fresh Fruits
        {"names": ["Bananas", "Robusta Bananas", "Red Bananas"], "img": "./images/banana_fruit.jpg", "price": (40, 80)},
        {"names": ["Watermelon", "Kiran Watermelon"], "img": "./images/watermelon.jpg", "price": (20, 50)},
        {"names": ["Mixed Fruits", "Fruit Basket", "Mangoes", "Papaya"], "img": "./images/fruits.png", "price": (100, 250)}
    ],
    2: [ # Vegetables
        {"names": ["Carrots", "Ooty Carrots"], "img": "./images/carrot.jpg", "price": (40, 80)},
        {"names": ["Tomatoes", "Country Tomatoes", "Hybrid Tomatoes"], "img": "./images/tomato.png", "price": (20, 60)},
        {"names": ["Potatoes", "Hassan Potatoes"], "img": "./images/potato.png", "price": (30, 70)},
        {"names": ["Onions", "Bellary Onions", "Small Onions"], "img": "./images/onion.png", "price": (40, 90)}
    ],
    3: [ # Organic Produce
        {"names": ["Spinach", "Keerai", "Moringa Leaves"], "img": "./images/spinach.jpg", "price": (15, 40)},
        {"names": ["Organic Tomatoes", "Pesticide-free Tomatoes"], "img": "./images/tomato.png", "price": (40, 90)}
    ],
    4: [ # Spices
        {"names": ["Mixed Spices", "Garam Masala Spices", "Black Pepper"], "img": "./images/spices.jpg", "price": (400, 1200)},
        {"names": ["Dry Red Chillies", "Guntur Chillies"], "img": "./images/chilli.jpg", "price": (150, 300)}
    ],
    5: [ # Grains
        {"names": ["Ponni Rice", "Basmati Rice", "Raw Rice"], "img": "./images/rice_grain.jpg", "price": (50, 120)},
        {"names": ["Wheat", "Samba Wheat"], "img": "./images/wheat.jpg", "price": (30, 60)}
    ],
    6: [ # Dairy
        {"names": ["Cow Milk", "Buffalo Milk", "Fresh Milk"], "img": "./images/milk_bottle.jpg", "price": (50, 80)}
    ],
    7: [ # Honey
        {"names": ["Wild Forest Honey", "Neem Honey", "Raw Honey"], "img": "./images/honey_jar.jpg", "price": (300, 800)}
    ],
    8: [ # Baskets
        {"names": ["Bamboo Basket", "Woven Basket", "Farm Basket"], "img": "./images/bamboo_basket.jpg", "price": (100, 300)}
    ]
}

products = []
current_id = 1000

for cat_id, templates in product_templates.items():
    for _ in range(35):
        current_id += 1
        template = random.choice(templates)
        base_name = random.choice(template["names"])
        adj = random.choice(adjectives)
        title = f"{adj} {base_name}"
        price_val = random.randint(template["price"][0], template["price"][1])
        
        # Determine unit
        unit = "kg"
        if cat_id == 5: # Grains often sold in bulk, but we'll stick to kg for consistency, or bags
            unit = "kg"
        elif cat_id == 6:
            unit = "liter"
        elif cat_id == 8:
            unit = "piece"
            
        price_str = f"\u20b9 {price_val} / {unit}"
        loc = random.choice(locations) + ", Tamil Nadu"
        seller = random.choice(sellers)
        
        products.append({
            "id": str(current_id),
            "categoryId": cat_id,
            "title": title,
            "price": price_str,
            "location": loc,
            "year": random.choice(["Harvested Today", "Fresh Stock", "Ready to dispatch", "Dry & Good Size", "New Arrival"]),
            "image": template["img"],
            "seller": seller,
            "desc": f"{title} available directly from the farm at {loc}. We ensure the highest quality and fair pricing. Contact {seller} for bulk orders and negotiations."
        })

ts_content = f'''export const mockProducts = {json.dumps(products, indent=2)};

export const getProductById = (id: string) => mockProducts.find(p => p.id === id);
export const getProductsByCategory = (categoryId: number) => mockProducts.filter(p => p.categoryId === categoryId);
'''

with open('src/data/mockProducts.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated mapped products successfully.")
