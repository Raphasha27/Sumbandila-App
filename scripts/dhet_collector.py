import pdfplumber
import pandas as pd
import json
import os

# DHET_COLLECTOR: Part of the Sumbandila Sentinel Intelligence Engine
# Strategy: Monthly Batch Sync with Pandas Cleaning
# Focus: Section A (Cancelled) and Section B (Registered & Accredited)

def sync_dhet_register(pdf_path):
    print(f"[*] Initializing Sentinel Sync on: {pdf_path}")
    
    with pdfplumber.open(pdf_path) as pdf:
        all_rows = []
        # Section B (Approved) usually starts around page 10 in 2026 Registers
        for page in pdf.pages[10:]: 
            table = page.extract_table()
            if table:
                all_rows.extend(table)
        
        if not all_rows:
            print("[!] No data found. Verify PDF structure.")
            return

        # Clean and Convert to DataFrame
        df = pd.DataFrame(all_rows[1:], columns=all_rows[0])
        
        # Mapping to Sentinel Schema
        # Note: We specifically filter for 'Cancelled' markers from Section A
        registry_data = []
        for _, row in df.iterrows():
            entry = {
                "name": row.get('Name of Institution', ''),
                "reg_number": row.get('Registration Certificate No.', ''),
                "status": "Registered" if "cancelled" not in str(row).lower() else "Cancelled",
                "accredited_courses": str(row.get('Approved Qualifications', '')).split(','),
                "last_verified": "2026-04-15"
            }
            registry_data.append(entry)

        # Save to Sentinel Cache
        os.makedirs("data", exist_ok=True)
        with open("data/dhet_registry_cache.json", "w") as f:
            json.dump(registry_data, f, indent=4)
            
        print(f"[+] Sync Complete. {len(registry_data)} records cached in Sentinel Database.")

if __name__ == "__main__":
    print("Sumbandila Sentinel: DHET Sync Engine v2.0 (April 2026)")
