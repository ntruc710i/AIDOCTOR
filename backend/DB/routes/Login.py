from pydantic import BaseModel, Field

from jose import JWTError, jwt
from datetime import datetime, timedelta

from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from DB.routes.middleware import get_current_user,verify_token_middleware
# Tạo một đối tượng CryptContext để mã hóa mật khẩu
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserModel(BaseModel):
    name: str
    email: str
    password:str
    
    

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "password": "******"
                
                
                
            }
        }
class LoginModel(BaseModel):
    email: str
    password:str
    
    

    class Config:
        schema_extra = {
            "example": {
                "email": "john.doe@example.com",
                "password": "******"
                
                
                
            }
}
from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

loginrouter = APIRouter()


@loginrouter.post("/register", response_description="Register a new user")
async def register_user(request: Request, user: UserModel = Body(...)):
    
    # Kiểm tra xem người dùng đã tồn tại hay chưa
    existing_user = await request.app.mongodb["User"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="email already registered")

    # Hash mật khẩu
    user.password= pwd_context.hash(user.password)
    user = jsonable_encoder(user)
    # Lưu thông tin người dùng vào MongoDB
    await request.app.mongodb["User"].insert_one(user)

    return {"message": "User registered successfully"}



# Mã hóa và giải mã JWT
SECRET_KEY = "aidoctor710"
ALGORITHM = "HS256"

# Hàm để tạo JWT token
def create_jwt_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@loginrouter.post("/login", response_description="Login and get access token")
async def login_user(request:Request, user: LoginModel = Body(...)):
    # Kiểm tra thông tin đăng nhập trong MongoDB
    userdb = await request.app.mongodb["User"].find_one({"email": user.email})
    if userdb and pwd_context.verify(user.password, userdb["password"]):
        # Sinh ra access token và trả về cho người dùng
        access_token_expires = timedelta(minutes=30)
        refresh_token_expires = timedelta(days=30)

        access_token = create_jwt_token(data={"sub": user.email}, expires_delta=access_token_expires)
        refresh_token = create_jwt_token(data={"sub": user.email}, expires_delta=refresh_token_expires)
        return {"access_token": access_token, "token_type": "bearer", "refresh_token": refresh_token}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
@loginrouter.post("/refresh-token", response_description="Refresh Access Token")
async def refresh_token(request: Request, current_user: dict = Depends(verify_token_middleware)):
    access_token_expires = timedelta(minutes=30)
    access_token = create_jwt_token(data={"sub": current_user["sub"]}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

    


