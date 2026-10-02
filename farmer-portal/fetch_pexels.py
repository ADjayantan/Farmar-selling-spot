import urllib.request

urls = [
    'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1580112/pexels-photo-1580112.jpeg?auto=compress&cs=tinysrgb&w=300'
]
filenames = ['tractor.png', 'rice.png', 'seeds.png', 'land.png']

for url, filename in zip(urls, filenames):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(f'public/images/{filename}', 'wb') as out_file:
        out_file.write(response.read())
        print(f"Downloaded {filename}")
