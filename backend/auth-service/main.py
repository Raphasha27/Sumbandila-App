from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET = 'CHANGE_ME_IN_PRODUCTION'
ALGORITHM = 'HS256'

app = FastAPI(title='Sumbandila - Auth Service')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

class UserIn(BaseModel):
    name: str
    phone: str
    password: str

fake_db = {}

@app.post('/signup')
def signup(u: UserIn):
    if u.phone in fake_db:
        raise HTTPException(status_code=400, detail='user exists')
    fake_db[u.phone] = {'name':u.name, 'password':u.password}
    return {'status':'ok'}

@app.post('/token')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_db.get(form_data.username)
    if not user or user['password'] != form_data.password:
        raise HTTPException(status_code=401, detail='invalid credentials')
    to_encode = {'sub': form_data.username, 'exp': datetime.utcnow() + timedelta(hours=2)}
    token = jwt.encode(to_encode, SECRET, algorithm=ALGORITHM)
    return {'access_token': token, 'token_type':'bearer'}

@app.get('/me')
def me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        user = payload.get('sub')
        return {'user': user}
    except JWTError:
        raise HTTPException(status_code=401, detail='Invalid token')
