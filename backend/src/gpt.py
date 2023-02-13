from gpt_index import GPTSimpleVectorIndex, Document

def generate_solution(workspace) -> str:
    documents = [Document(document) for document in workspace.documents]

    # TODO: make it more optimized by storing and updating the vector index
    # instead of creating a new one on every call
    index = GPTSimpleVectorIndex(documents)

    response = index.query(workspace.input)

    return response
