# 🐍 Education Verification API (FastAPI)

This folder contains a high-performance **Python Microservice** used to query the Verification Database.

## 🚀 Why FastAPI?
We chose FastAPI over Flask/Django because:
1.  **Speed:** It uses `Starlette` and `Pydantic` for incredible performance (on par with Node.js).
2.  **Async/Await:** perfect for database-heavy I/O operations (like verifying 1000s of certs).
3.  **Auto-Docs:** Automatically generates Swagger UI (`/docs`).

## 🛠️ Setup
1.  Create a Virtual Environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```
2.  Install Dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the Server:
    ```bash
    uvicorn main:app --reload
    ```
4.  Open API Docs:
    Go to `http://localhost:8000/docs` to test endpoints.

## 🔌 Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/verify/{cert_number}` | Checks if a certificate ID is valid. Returns verified metadata. |
| `POST` | `/verify/bulk` | (Enterprise) Batch check multiple certificates at once. |
