FROM python:3.12-slim

WORKDIR /app

# The audit service uses the shared requirements from the parent services directory
# since it doesn't have its own local requirements.txt yet.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "main.py"]
