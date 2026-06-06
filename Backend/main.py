import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
from pydantic import BaseModel
import numpy as np

BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"


class BookRequest(BaseModel):
    book_name: str


app = FastAPI()

#middleware
cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_pickle(filename: str):
    with open(MODELS_DIR / filename, "rb") as file:
        return pickle.load(file)


# Load trained artifacts relative to this file so Render's working directory does not matter.
Popular_Books = load_pickle("Popular_Books")
pt = load_pickle("pt.pkl")
books = load_pickle("books.pkl")
similarity_scores = load_pickle("similarity_scores.pkl")


@app.get("/")
def home():
    return {"message":"server loaded successfully"}

#get top-50 popular books 
@app.get("/popular")
def get_popular_books():
    
    books = Popular_Books.to_dict("records")
    return books



def recommend(book_name):
    
    index = np.where(pt.index == book_name)[0][0]
    distances = similarity_scores[index]
    similar_items = sorted(list(enumerate(similarity_scores[index])),key=lambda x:x[1],reverse=True)[1:6]
    suggestions = []
    for i in similar_items:
        temp_df = books[
            books['Book-Title'] == pt.index[i[0]]
           ]

            
        suggestions.append({
            "Book-Title":temp_df['Book-Title'].values[0],
            "Book-Author":temp_df['Book-Author'].values[0],
            "Image-URL-M":temp_df['Image-URL-M'].values[0]
            }
        )
    return list(suggestions)
   


@app.post("/recommendation")
def get_recommendation(request:BookRequest):
    try:
       return recommend(request.book_name)
    except:
        return{"error":"Book not found"}

    


    
