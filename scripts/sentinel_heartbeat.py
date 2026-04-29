import asyncio
import requests
from playwright.async_api import async_playwright

# SUMBANDILA SENTINEL: Scraper Heartbeat Service
# Strategy: Daily Health Check via "Known Entity" Lookup
# Goal: Alert developers if government site HTML structures change.

KNOWN_DOCTOR = "Mhlangu" # Representative famous practitioner
KNOWN_COLLEGE = "University of the Witwatersrand"

async def check_scraper_health():
    print("[*] Initializing Sentinel Heartbeat Check...")
    
    # 1. Test HPCSA Scraper
    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto("https://iservices.hpcsa.co.za/iRegister/", timeout=30000)
            
            # Check if search field still exists
            search_field = await page.query_selector('input[name="Surname"]')
            if not search_field:
                raise Exception("HPCSA Scraper Broken: Surname field not found.")
            
            print("[+] HPCSA Scraper: HEALTHY")
            await browser.close()
        except Exception as e:
            print(f"[!] HPCSA HEARTBEAT FAILURE: {str(e)}")
            # In production: Send alert to Slack/Email here

    # 2. Test DHET Sync Connectivity
    try:
        response = requests.get("https://www.dhet.gov.za/SitePages/Docregisters.aspx", timeout=10)
        if response.status_code == 200:
            print("[+] DHET Portal: ACCESSIBLE")
        else:
            print(f"[!] DHET Portal: RETURNED {response.status_code}")
    except Exception as e:
        print(f"[!] DHET CONNECTIVITY FAILURE: {str(e)}")

if __name__ == "__main__":
    asyncio.run(check_scraper_health())
