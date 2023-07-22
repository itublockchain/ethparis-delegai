import requests
from bs4 import BeautifulSoup
import json

def get_all_text_in_p_elements(url):
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0'}

    # Send a GET request to the URL and fetch the HTML content
    response2 = requests.get(url, headers=headers)
    response2.raise_for_status() # Raise an exception for any HTTP errors
    html_content = response2

    json_content = json.loads(html_content.content)

    for item in json_content["post_stream"]["posts"]:
        soup = BeautifulSoup(item["cooked"], "html.parser")
        print(soup.find("p").text, "\n\n")

if __name__ == "__main__":
    target_url = "https://forum.gnosis.io/t/6440/posts.json"  # Replace this with the URL you want to scrape

    scraped_text = get_all_text_in_p_elements(target_url)
    # for text in scraped_text:
    #     for item in text["posts"]:
    #         print(item["cooked"])
