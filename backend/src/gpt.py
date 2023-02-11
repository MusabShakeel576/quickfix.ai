from typing import List
from gpt_index import GPTSimpleVectorIndex

def generate_solution(workspace_name: str, input: str, documents: List[str]) -> str:
    index = GPTSimpleVectorIndex(documents)
    prompt = f"""You are very enthusiastic Software Engineer who love to help developers! Given the code snippets from a developer source code, solve the error using only that information, outputted in markdown format. If you are unsure and the solution is not explicitly written in the source code, say "Sorry, I don't know how to help with that."
    Error:
    {input}
    Answer as markdown (including related code snippets if available)."""
    response = index.query(prompt)
    return response
