import csv
import random
import uuid

def generate_mock_data(count=50000):
    provinces = ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Limpopo", "Mpumalanga", "Free State", "North West", "Northern Cape"]
    professions = ["Doctor", "Attorney", "Advocate", "Specialist", "Psychologist", "Nurse"]
    authorities = {
        "Doctor": "HPCSA",
        "Specialist": "HPCSA",
        "Psychologist": "HPCSA",
        "Nurse": "SANC",
        "Attorney": "LPC",
        "Advocate": "LPC"
    }
    statuses = ["Practising", "Active", "Suspended", "Struck Off", "Good Standing"]
    
    first_names = ["John", "Jane", "Sipho", "Lindiwe", "Thabo", "Nomsa", "Chris", "Sarah", "Tumi", "Kevin", "Lerato", "Musa"]
    last_names = ["Smith", "Dlamini", "Zuma", "Muller", "Ndlovu", "Smit", "Botha", "Grootboom", "Khuma", "Molefe"]

    with open('data/verified_registry_v4.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["id", "full_name", "profession", "license_number", "authority", "status", "province", "trust_score", "identity_verified", "risk_level"])
        
        for i in range(count):
            id = str(uuid.uuid4())
            fname = random.choice(first_names)
            lname = random.choice(last_names)
            full_name = f"{fname} {lname}"
            prof = random.choice(professions)
            auth = authorities.get(prof, "Other")
            
            # Generate realistic license numbers
            if auth == "HPCSA":
                license = f"MP{random.randint(100000, 999999)}"
            elif auth == "LPC":
                license = f"LP{random.randint(100000, 999999)}"
            else:
                license = f"REG{random.randint(10000, 99999)}"
                
            status = random.choices(statuses, weights=[70, 15, 5, 5, 5])[0]
            prov = random.choice(provinces)
            
            # Logic-based trust score
            if status in ["Practising", "Active", "Good Standing"]:
                trust_score = random.randint(90, 100)
                risk = "Low"
                id_verified = True
            elif status == "Suspended":
                trust_score = random.randint(40, 60)
                risk = "Medium"
                id_verified = True
            else:
                trust_score = random.randint(0, 30)
                risk = "Critical"
                id_verified = False
            
            writer.writerow([id, full_name, prof, license, auth, status, prov, trust_score, id_verified, risk])

if __name__ == "__main__":
    import os
    os.makedirs('data', exist_ok=True)
    print("Generating 50,000 national registry records...")
    generate_mock_data(50000)
    print("data/verified_registry_v4.csv created successfully.")
