from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware (
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"],
)

with open("db.json", "r", encoding="utf-8") as file:
    db = json.load(file)

@app.get('/subjects')
def get_subjects():
    return db