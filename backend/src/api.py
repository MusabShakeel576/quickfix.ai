from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

from .gpt import generate_solution

class Workspace(BaseModel):
    input: str
    documents: List[str]

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/workspace/{workspace_name}")
def create_solution(workspace_name: str, workspace: Workspace):
    solution = generate_solution(workspace_name, workspace.input, workspace.documents)
    return {"solution": solution}
