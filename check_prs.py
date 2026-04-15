import urllib.request
import json
url = 'https://api.github.com/repos/Raphasha27/Sumbandila-App/pulls?state=open'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    for pr in data:
        print(f"#{pr['number']}: {pr['title']}")
