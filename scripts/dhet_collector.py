import pdfplumber
import json
import os

# DHET_COLLECTOR: Part of the Sumbandila Sentinel Intelligence Engine
# Strategy: Cached Database approach for Institutional Registration
# This script parses the "Register of Private Higher Education Institutions" 

def extract_dhet_registry(pdf_path):
    print(f"[*] Initializing Sentinel PDF Parse on: {pdf_path}")
    registry_data = []
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                # Extracting table data from the complex DHET PDF layout
                table = page.extract_table()
                if table:
                    for row in table[1:]: # Skip header
                        if row and len(row) >= 3:
                            entry = {
                                "name": row[0],
                                "reg_number": row[1],
                                "status": "Registered",
                                "site_of_delivery": row[2] if len(row) > 2 else "Unknown",
                                "source": "DHET Register of Private HEIs",
                                "accredited_courses": [] # To be filled by Course Collector
                            }
                            registry_data.append(entry)
                            
        # Save to our cached sentinel database (JSON for now)
        output_path = os.path.join("data", "dhet_registry_cache.json")
        os.makedirs("data", exist_ok=True)
        with open(output_path, "w") as f:
            json.dump(registry_data, f, indent=4)
            
        print(f"[+] Successfully cached {len(registry_data)} institutions from DHET.")
        
    except Exception as e:
        print(f"[!] Critical Error during registry extraction: {str(e)}")

if __name__ == "__main__":
    # Placeholder path - in production, this would be the latest downloaded register
    PDF_PATH = "docs/registers/DHET_Private_HEI_Register_Latest.pdf"
    print("Sumbandila Sentinel: Registry Collector Active.")
    # extract_dhet_registry(PDF_PATH)
