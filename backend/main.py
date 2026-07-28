from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import time

from ai_model import generate_sql
from database import execute_query


app = FastAPI()


# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "API is running"
    }


@app.post("/query")
def query_database(request: QueryRequest):

    # Start timer
    start_time = time.time()

    question = request.question


    # Generate SQL using AI
    sql_query = generate_sql(question)


    # SQL Safety Check
    if not sql_query.lower().strip().startswith("select"):

        return {
            "question": question,
            "sql": sql_query,
            "result": [],
            "error": "Only SELECT queries are allowed for security reasons."
        }


    # Execute SQL Query
    result = execute_query(sql_query)


    # End timer
    end_time = time.time()

    execution_time = round(end_time - start_time, 3)


    return {
        "question": question,
        "sql": sql_query,
        "result": result,
        "execution_time": execution_time
    }