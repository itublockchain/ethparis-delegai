import requests

url = "https://forum.gnosis.io/t/4717/posts.json"
data = {"url": url}
response = requests.get(url="https://forum.gnosis.io/posts.json", json=data)

if response.ok:
    result = response.json()
    if result.get('success'):
        print(result['topics'])
    else:
        print("Error:", result.get('error'))
else:
    print("Failed to make a request to the API.")

