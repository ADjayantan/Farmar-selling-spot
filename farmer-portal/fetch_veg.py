import urllib.request

urls = [
    'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/4197491/pexels-photo-4197491.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300'
]
filenames = ['tomato.png', 'potato.png', 'onion.png', 'fruits.png']

for url, filename in zip(urls, filenames):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(f'public/images/{filename}', 'wb') as out_file:
        out_file.write(response.read())
        print(f"Downloaded {filename}")
