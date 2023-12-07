from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, Form, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from DB.routes.Record import router
from DB.routes.Login import loginrouter
from motor.motor_asyncio import AsyncIOMotorClient

from tensorflow.keras.preprocessing.image import load_img

from transforms import get_base64_png
from Yolov8.main import ChestXrayDetectionYOLOv8
from Covid19.predict import Covid19ChestXrayDetection
from BrainMRI.predict import BrainTumorSegmentation
import cv2
import numpy as np
import os

detection_lung_model = ChestXrayDetectionYOLOv8()
covid19_detect_model = Covid19ChestXrayDetection()
brain_mri_model = BrainTumorSegmentation()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(router)
app.include_router(loginrouter)
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient("mongodb://localhost:27017")
    app.mongodb = app.mongodb_client["AIDoctor"]

#API Chest X-ray use Yolov8
@app.post("/yolov8")
async def chest_xray(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        image = np.asarray(bytearray(contents))
        img = cv2.imdecode(image, cv2.IMREAD_COLOR)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    
    # Inference
    pr_viz, lbrs = detection_lung_model.predict(img)
    response = {
        "success": True,
        "imageraw":get_base64_png(img),
        "image": get_base64_png(pr_viz),
        "label": lbrs,
        "pred": "None"
    }
    return response

#API Covid19 
@app.post("/covid19")
async def covid19_xray(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open("images/" + file.filename, "wb") as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    # Inference
    img = cv2.imread("images/"+file.filename)
    image = load_img("images/"+file.filename, target_size=(128, 128))
    pred, lb = covid19_detect_model.predict(image)
    os.remove("images/"+file.filename)
    print(pred)
    response = {
        "success": True,
        "imageraw":get_base64_png(img),
        "image": get_base64_png(img),
        "label": lb,
        "pred": pred

    }
    return response

#API Brain Tumor Segment
@app.post("/brainmri")
async def brain_mri(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        with open("images/" + file.filename, "wb") as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    # Inference
    img = cv2.imread("images/"+file.filename,cv2.IMREAD_UNCHANGED)
    image = load_img("images/"+file.filename, target_size=(256, 256))
    pred,lb= brain_mri_model.predict(image)
    os.remove("images/"+file.filename)
    print(pred)
    response = {
        "success": True,
        "imageraw":get_base64_png(img),
        "image": get_base64_png(pred),
        "label": lb,
        "pred": "None"

    }
    return response