from typing import Optional
import uuid
from datetime import date
from pydantic import BaseModel, Field
from DB.routes.middleware import get_current_user,verify_token_middleware

class RecordModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    gender: str
    idnumber: int
    birthday: str
    phone: int
    exday: str
    image: str
    rsimage:str
    label: str
    pred : str
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "Learn FARM Stack",
                "gender": "None",
                "idnumber": 123456,
                "birthday": "07/10/2001",
                "phone":    123456,
                "exday": "07/10/2001",
                "image": "",
                "rsimage":"",
                "label":"",
                "pred":""
            }
        }


class UpdateRecordModel(BaseModel):
    id: Optional[str]
    name: Optional[str]
    gender: Optional[str]
    idnumber: Optional[int]
    birthday: Optional[str]
    exday: Optional[str]
    image: Optional[str]
    rsimage:Optional[str]
    label : Optional[str]
    pred : Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "name": "Learn FARM Stack",
                "gender": "None",
                "idnumber": 123456,
                "birthday": "07/10/2001",
                "phone":    123456,
                "exday": "07/10/2001",
                "image": "",
                "rsimage":"",
                "label" :"",
                "pred":""
            }
        }

from fastapi import APIRouter, Body, Depends, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


router = APIRouter()



@router.get("/allrecord/", response_description="List all Record",dependencies=[Depends(verify_token_middleware)])
async def list_records(request: Request, current_user: dict = Depends(verify_token_middleware),):
    records = []
    for doc in await request.app.mongodb["Record"].find().to_list(length=100):
        records.append(doc)
    return records


@router.get("/record/{id}", response_description="Get a single Record")
async def show_record(id: str, request: Request, current_user: dict = Depends(verify_token_middleware),):
    if (record := await request.app.mongodb["Record"].find_one({"_id": id})) is not None:
        return record

    raise HTTPException(status_code=404, detail=f"record {id} not found")


@router.post("/addrecord/", response_description="Add new Record")
async def create_record(request: Request, record: RecordModel = Body(...), current_user: dict = Depends(verify_token_middleware),):
    record = jsonable_encoder(record)
    new_record = await request.app.mongodb["Record"].insert_one(record)
    created_record = await request.app.mongodb["Record"].find_one(
        {"_id": new_record.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_record)


@router.put("/updaterecord/{id}", response_description="Update a Record")
async def update_record(id: str, request: Request, record: UpdateRecordModel = Body(...), current_user: dict = Depends(verify_token_middleware),):
    record = {k: v for k, v in record.dict().items() if v is not None}

    if len(record) >= 1:
        update_result = await request.app.mongodb["Record"].update_one(
            {"_id": id}, {"$set": record}
        )

        if update_result.modified_count == 1:
            if (
                updated_record := await request.app.mongodb["Record"].find_one({"_id": id})
            ) is not None:
                return updated_record

    if (
        existing_record := await request.app.mongodb["Record"].find_one({"_id": id})
    ) is not None:
        return existing_record

    raise HTTPException(status_code=404, detail=f"record {id} not found")


@router.delete("/deleterecord/{id}", response_description="Delete record")
async def delete_record(id: str, request: Request, current_user: dict = Depends(verify_token_middleware),):
    delete_result = await request.app.mongodb["Record"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"record {id} not found")