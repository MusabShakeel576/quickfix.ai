from pathlib import Path
from gpt_index import GPTSimpleVectorIndex, Document

def generate_index(workspace):
    file = workspace.name+'.json'
    path = Path.cwd() / "storage" / file

    if path.is_file():
        index = GPTSimpleVectorIndex.load_from_disk(path)
    else:
        documents = [Document(document) for document in workspace.documents]
        index = GPTSimpleVectorIndex(documents)
        with open(path, 'w'):
            pass
        index.save_to_disk(path)
        
    return index

def generate_solution(workspace) -> str:
    index = generate_index(workspace)
    response = index.query(workspace.input)
    return response
