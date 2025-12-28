
// Real South African Institutions (Fallback Data)
const institutions = [
    { institution_id: 'UP001', name: 'University of Pretoria', status: true, address: 'Pretoria, Gauteng', details: 'Public research university established in 1908' },
    { institution_id: 'WITS001', name: 'University of the Witwatersrand', status: true, address: 'Johannesburg, Gauteng', details: 'Leading research-intensive university' },
    { institution_id: 'UCT001', name: 'University of Cape Town', status: true, address: 'Cape Town, Western Cape', details: 'Oldest university in South Africa, founded 1829' },
    { institution_id: 'SUN001', name: 'Stellenbosch University', status: true, address: 'Stellenbosch, Western Cape', details: 'Research university established in 1918' },
    { institution_id: 'UKZN001', name: 'University of KwaZulu-Natal', status: true, address: 'Durban, KwaZulu-Natal', details: 'Formed by merger in 2004' },
    { institution_id: 'UJ001', name: 'University of Johannesburg', status: true, address: 'Johannesburg, Gauteng', details: 'Comprehensive urban university' },
    { institution_id: 'NWU001', name: 'North-West University', status: true, address: 'Potchefstroom, North West', details: 'Multi-campus university' },
    { institution_id: 'UFS001', name: 'University of the Free State', status: true, address: 'Bloemfontein, Free State', details: 'Established in 1904' },
    { institution_id: 'RU001', name: 'Rhodes University', status: true, address: 'Grahamstown, Eastern Cape', details: 'Prestigious research university' },
    { institution_id: 'NMMU001', name: 'Nelson Mandela University', status: true, address: 'Port Elizabeth, Eastern Cape', details: 'Comprehensive university' },
    { institution_id: 'TUT001', name: 'Tshwane University of Technology', status: true, address: 'Pretoria, Gauteng', details: 'Largest residential university of technology' },
    { institution_id: 'CPUT001', name: 'Cape Peninsula University of Technology', status: true, address: 'Cape Town, Western Cape', details: 'University of technology' },
    { institution_id: 'DUT001', name: 'Durban University of Technology', status: true, address: 'Durban, KwaZulu-Natal', details: 'First university of technology in South Africa' },
    { institution_id: 'VUT001', name: 'Vaal University of Technology', status: true, address: 'Vanderbijlpark, Gauteng', details: 'University of technology established 1966' },
    { institution_id: 'UNISA001', name: 'University of South Africa (UNISA)', status: true, address: 'Pretoria, Gauteng', details: 'Largest open distance learning institution in Africa' },
    { institution_id: 'SMU001', name: 'Sefako Makgatho Health Sciences University', status: true, address: 'Ga-Rankuwa, Gauteng', details: 'Dedicated health sciences university' },
    { institution_id: 'WSU001', name: 'Walter Sisulu University', status: true, address: 'Mthatha, Eastern Cape', details: 'Comprehensive university' },
    { institution_id: 'UL001', name: 'University of Limpopo', status: true, address: 'Polokwane, Limpopo', details: 'Comprehensive university' },
    { institution_id: 'UMP001', name: 'University of Mpumalanga', status: true, address: 'Mbombela, Mpumalanga', details: 'Newest university, established 2014' },
    { institution_id: 'UFH001', name: 'University of Fort Hare', status: true, address: 'Alice, Eastern Cape', details: 'Historic university founded 1916' },
    { institution_id: 'SPU001', name: 'Sol Plaatje University', status: true, address: 'Kimberley, Northern Cape', details: 'Established in 2014' },
    { institution_id: 'UNIVEN001', name: 'University of Venda', status: true, address: 'Thohoyandou, Limpopo', details: 'Comprehensive rural-based university' },
    { institution_id: 'MUT001', name: 'Mangosuthu University of Technology', status: true, address: 'Umlazi, KwaZulu-Natal', details: 'University of technology' },
    { institution_id: 'CUT001', name: 'Central University of Technology', status: true, address: 'Bloemfontein, Free State', details: 'University of technology' },
    { institution_id: 'RGI001', name: 'Richfield Graduate Institute of Technology', status: true, address: 'National', details: 'Private higher education institution' },
    { institution_id: 'VEGA001', name: 'Vega School', status: true, address: 'National', details: 'Private higher education institution' },
    { institution_id: 'BC001', name: 'Boston City Campus', status: true, address: 'National', details: 'Private higher education institution' },
    { institution_id: 'RC001', name: 'Rosebank College', status: true, address: 'National', details: 'Part of the IIE' },
    { institution_id: 'VC001', name: 'Varsity College', status: true, address: 'National', details: 'Part of the IIE' }
];

// South African Medical Professionals
const doctors = [
    { professional_id: 'MP001234', name: 'Dr. Thabo Mthembu', type: 'doctor', status: true, specialty: 'General Practice', details: 'HPCSA Registered - Cape Town' },
    { professional_id: 'MP002345', name: 'Dr. Naledi Khumalo', type: 'doctor', status: true, specialty: 'Pediatrics', details: 'HPCSA Registered - Johannesburg' },
    { professional_id: 'MP003456', name: 'Dr. Johan van der Merwe', type: 'doctor', status: true, specialty: 'Cardiology', details: 'HPCSA Registered - Pretoria' },
    { professional_id: 'MP004567', name: 'Dr. Zanele Ndlovu', type: 'doctor', status: true, specialty: 'Dermatology', details: 'HPCSA Registered - Durban' },
    { professional_id: 'MP005678', name: 'Dr. Pieter Botha', type: 'doctor', status: true, specialty: 'Orthopedics', details: 'HPCSA Registered - Stellenbosch' },
    { professional_id: 'MP006789', name: 'Dr. Lerato Mokoena', type: 'doctor', status: true, specialty: 'Psychiatry', details: 'HPCSA Registered - Bloemfontein' },
    { professional_id: 'MP007890', name: 'Dr. Sipho Dlamini', type: 'doctor', status: true, specialty: 'Surgery', details: 'HPCSA Registered - Port Elizabeth' },
    { professional_id: 'MP008901', name: 'Dr. Sarah de Klerk', type: 'doctor', status: true, specialty: 'Obstetrics & Gynecology', details: 'HPCSA Registered - Cape Town' },
    { professional_id: 'MP009012', name: 'Dr. Mpho Molefe', type: 'doctor', status: true, specialty: 'Neurology', details: 'HPCSA Registered - Johannesburg' },
    { professional_id: 'MP010123', name: 'Dr. Elena Coetzee', type: 'doctor', status: true, specialty: 'Radiology', details: 'HPCSA Registered - Pretoria' },
    { professional_id: 'MP011234', name: 'Dr. Bongani Ndaba', type: 'doctor', status: true, specialty: 'Oncology', details: 'HPCSA Registered - Durban' },
    { professional_id: 'MP012345', name: 'Dr. Annika Viljoen', type: 'doctor', status: true, specialty: 'Anesthesiology', details: 'HPCSA Registered - Cape Town' },
    { professional_id: 'MP013456', name: 'Dr. Kabelo Maseko', type: 'doctor', status: true, specialty: 'Internal Medicine', details: 'HPCSA Registered - Johannesburg' },
    { professional_id: 'MP014567', name: 'Dr. Ruan Erasmus', type: 'doctor', status: true, specialty: 'Emergency Medicine', details: 'HPCSA Registered - Pretoria' },
    { professional_id: 'MP015678', name: 'Dr. Nkosi Zulu', type: 'doctor', status: true, specialty: 'Family Medicine', details: 'HPCSA Registered - Polokwane' },
    { professional_id: 'MP016789', name: 'Dr. Fatima Patel', type: 'doctor', status: true, specialty: 'Ophthalmology', details: 'HPCSA Registered - Lenasia' },
    { professional_id: 'MP017890', name: 'Dr. Yaseen Ally', type: 'doctor', status: true, specialty: 'General Practice', details: 'HPCSA Registered - Durban' },
    { professional_id: 'MP018901', name: 'Dr. Susan Jenkins', type: 'doctor', status: true, specialty: 'Pediatrics', details: 'HPCSA Registered - Sandton' },
    { professional_id: 'MP019012', name: 'Dr. Vusi Mahlangu', type: 'doctor', status: true, specialty: 'Sports Medicine', details: 'HPCSA Registered - Soweto' },
    { professional_id: 'MP020123', name: 'Dr. Charlene Nasoo', type: 'doctor', status: true, specialty: 'Dermatology', details: 'HPCSA Registered - Cape Town' }
];

// South African Legal Professionals
const lawyers = [
    { professional_id: 'LP101234', name: 'Adv. Themba Mahlangu', type: 'lawyer', status: true, specialty: 'Corporate Law', details: 'Law Society Registered - Johannesburg' },
    { professional_id: 'LP102345', name: 'Adv. Michelle du Plessis', type: 'lawyer', status: true, specialty: 'Criminal Law', details: 'Law Society Registered - Cape Town' },
    { professional_id: 'LP103456', name: 'Adv. Mandla Tshabalala', type: 'lawyer', status: true, specialty: 'Constitutional Law', details: 'Law Society Registered - Pretoria' },
    { professional_id: 'LP104567', name: 'Adv. Sarah Ngubane', type: 'lawyer', status: true, specialty: 'Family Law', details: 'Law Society Registered - Durban' },
    { professional_id: 'LP105678', name: 'Adv. Piet Steyn', type: 'lawyer', status: true, specialty: 'Commercial Law', details: 'Law Society Registered - Johannesburg' },
    { professional_id: 'LP106789', name: 'Adv. Ntombi Mbatha', type: 'lawyer', status: true, specialty: 'Labour Law', details: 'Law Society Registered - Cape Town' },
    { professional_id: 'LP107890', name: 'Adv. André Fourie', type: 'lawyer', status: true, specialty: 'Property Law', details: 'Law Society Registered - Stellenbosch' },
    { professional_id: 'LP108901', name: 'Adv. Zinhle Kgomo', type: 'lawyer', status: true, specialty: 'Human Rights Law', details: 'Law Society Registered - Johannesburg' },
    { professional_id: 'LP109012', name: 'Adv. Jacques Marais', type: 'lawyer', status: true, specialty: 'Tax Law', details: 'Law Society Registered - Pretoria' },
    { professional_id: 'LP110123', name: 'Adv. Lindiwe Nkosi', type: 'lawyer', status: true, specialty: 'Administrative Law', details: 'Law Society Registered - Bloemfontein' },
    { professional_id: 'LP111234', name: 'Adv. Chris Venter', type: 'lawyer', status: true, specialty: 'Environmental Law', details: 'Law Society Registered - Cape Town' },
    { professional_id: 'LP112345', name: 'Adv. Palesa Moloi', type: 'lawyer', status: true, specialty: 'Intellectual Property', details: 'Law Society Registered - Johannesburg' },
    { professional_id: 'LP113456', name: 'Adv. Hennie van Zyl', type: 'lawyer', status: true, specialty: 'Banking Law', details: 'Law Society Registered - Sandton' },
    { professional_id: 'LP114567', name: 'Adv. Nokuthula Dube', type: 'lawyer', status: true, specialty: 'Immigration Law', details: 'Law Society Registered - Pretoria' },
    { professional_id: 'LP115678', name: 'Adv. Willem Pretorius', type: 'lawyer', status: true, specialty: 'Contract Law', details: 'Law Society Registered - Cape Town' },
    { professional_id: 'LP116789', name: 'Adv. Rajesh Pillay', type: 'lawyer', status: true, specialty: 'Conveyancing', details: 'Law Society Registered - Durban' },
    { professional_id: 'LP117890', name: 'Adv. Tshepo Mokoena', type: 'lawyer', status: true, specialty: 'Litigation', details: 'Law Society Registered - Soweto' },
    { professional_id: 'LP118901', name: 'Adv. Gerrie Nel', type: 'lawyer', status: true, specialty: 'Criminal Law', details: 'Law Society Registered - Pretoria' },
    { professional_id: 'LP119012', name: 'Adv. Dali Mpofu', type: 'lawyer', status: true, specialty: 'Constitutional Law', details: 'Law Society Registered - Johannesburg' },
    { professional_id: 'LP120123', name: 'Adv. Thuli Madonsela', type: 'lawyer', status: true, specialty: 'Administrative Law', details: 'Law Society Registered - Stellenbosch' }
];

module.exports = { institutions, doctors, lawyers };
