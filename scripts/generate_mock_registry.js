const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const provinces = ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Limpopo", "Mpumalanga", "Free State", "North West", "Northern Cape"];
const professions = ["Doctor", "Attorney", "Advocate", "Specialist", "Psychologist", "Nurse"];
const authorities = {
    "Doctor": "HPCSA",
    "Specialist": "HPCSA",
    "Psychologist": "HPCSA",
    "Nurse": "SANC",
    "Attorney": "LPC",
    "Advocate": "LPC"
};
const statuses = ["Practising", "Active", "Suspended", "Struck Off", "Good Standing"];

const firstNames = ["John", "Jane", "Sipho", "Lindiwe", "Thabo", "Nomsa", "Chris", "Sarah", "Tumi", "Kevin", "Lerato", "Musa"];
const lastNames = ["Smith", "Dlamini", "Zuma", "Muller", "Ndlovu", "Smit", "Botha", "Grootboom", "Khuma", "Molefe"];

function generateMockData(count = 50000) {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    const filePath = path.join(dataDir, 'verified_registry_v4.csv');
    const stream = fs.createWriteStream(filePath, { encoding: 'utf-8' });

    stream.write("id,full_name,profession,license_number,authority,status,province,trust_score,identity_verified,risk_level\n");

    for (let i = 0; i < count; i++) {
        const id = crypto.randomUUID();
        const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${fname} ${lname}`;
        const prof = professions[Math.floor(Math.random() * professions.length)];
        const auth = authorities[prof] || "Other";

        let license;
        if (auth === "HPCSA") {
            license = `MP${Math.floor(100000 + Math.random() * 900000)}`;
        } else if (auth === "LPC") {
            license = `LP${Math.floor(100000 + Math.random() * 900000)}`;
        } else {
            license = `REG${Math.floor(10000 + Math.random() * 90000)}`;
        }

        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const prov = provinces[Math.floor(Math.random() * provinces.length)];

        let trustScore, risk, idVerified;
        if (["Practising", "Active", "Good Standing"].includes(status)) {
            trustScore = Math.floor(90 + Math.random() * 11);
            risk = "Low";
            idVerified = true;
        } else if (status === "Suspended") {
            trustScore = Math.floor(40 + Math.random() * 21);
            risk = "Medium";
            idVerified = true;
        } else {
            trustScore = Math.floor(Math.random() * 31);
            risk = "Critical";
            idVerified = false;
        }

        stream.write(`${id},"${fullName}",${prof},${license},${auth},${status},${prov},${trustScore},${idVerified},${risk}\n`);
    }

    stream.end();
    console.log(`✅ ${filePath} created successfully with ${count} records.`);
}

generateMockData(50000);
