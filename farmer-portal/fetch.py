import urllib.request
import os

os.makedirs('public/images', exist_ok=True)

req = urllib.request.Request('https://images.unsplash.com/photo-1592837965902-1249b67362d2?auto=format&fit=crop&w=300&q=80', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open('public/images/tractor.png', 'wb') as out_file:
    out_file.write(response.read())

req = urllib.request.Request('https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open('public/images/rice.png', 'wb') as out_file:
    out_file.write(response.read())

req = urllib.request.Request('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open('public/images/seeds.png', 'wb') as out_file:
    out_file.write(response.read())

req = urllib.request.Request('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open('public/images/land.png', 'wb') as out_file:
    out_file.write(response.read())
