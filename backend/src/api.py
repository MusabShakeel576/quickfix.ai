from typing import List
from fastapi import FastAPI
from dotenv import load_dotenv
from pydantic import BaseModel

from .gpt import generate_solution

load_dotenv()

class Workspace(BaseModel):
    name: str
    input: str
    documents: List[str]

app = FastAPI()

@app.get("/")
def read_root():
    return {"Quickfix AI": "Backend"}

@app.post("/workspace")
def create_solution(workspace: Workspace):
    solution = generate_solution(workspace)
    return {"solution": solution}
