from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel

from .gpt import generate_solution, generate_index

load_dotenv()

class Workspace(BaseModel):
    name: str
    input: Optional[str] = None
    documents: Optional[List[str]] = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Quickfix AI": "Backend"}

@app.post("/workspace/index")
def create_index(workspace: Workspace):
    generate_index(workspace)
    return {"successful": True}

@app.post("/workspace/solution")
def create_solution(workspace: Workspace):
    solution = generate_solution(workspace)
    return {"solution": solution}
