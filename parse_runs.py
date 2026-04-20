import json

with open('runs10.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for run in data.get('workflow_runs', []):
    if run['name'] in ['Generate Snake', 'Metrics', 'Live Dashboard Update']:
        print(f"{run['name']} - Status: {run['status']} - Conclusion: {run['conclusion']} - ID: {run['id']}")
