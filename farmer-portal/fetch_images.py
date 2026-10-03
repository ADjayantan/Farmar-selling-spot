import urllib.request
import json
import re
import os

def download_pexels(query, filename):
    url = f"https://www.pexels.com/search/{query}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Pexels images are like https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg?auto=compress&cs=tinysrgb&w=600
        matches = re.findall(r'https://images\.pexels\.com/photos/\d+/[^"\'\?\s]+', html)
        if matches:
            img_url = matches[0] + "?auto=compress&cs=tinysrgb&w=600"
            img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(img_req).read()
            with open(f"public/images/{filename}.jpg", "wb") as f:
                f.write(img_data)
            print(f"Downloaded {filename}.jpg")
            return f"/images/{filename}.jpg"
    except Exception as e:
        print(f"Failed {query}: {e}")
    return None

queries = {
    "mango_fruit": "mango",
    "banana_fruit": "banana",
    "watermelon": "watermelon",
    "carrot": "carrot",
    "cabbage": "cabbage",
    "spinach": "spinach",
    "spices": "spices",
    "chilli": "chilli",
    "rice_grain": "rice-grain",
    "wheat": "wheat",
    "milk_bottle": "milk",
    "honey_jar": "honey",
    "bamboo_basket": "basket"
}

for q, k in queries.items():
    download_pexels(k, q)
