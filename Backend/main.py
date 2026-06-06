from fastapi import FastAPI,requests
from fastapi.middleware.cors import CORSMiddleware
import pickle
from pydantic import BaseModel
import numpy as np

class BookRequest(BaseModel):
    book_name: str


app = FastAPI()

#middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Popular_Books = pickle.load(open("models/Popular_Books", "rb"))
pt = pickle.load(open("models/pt.pkl", "rb"))
books = pickle.load(open("models/books.pkl", "rb"))
similarity_scores = pickle.load(open("models/similarity_scores.pkl", "rb"))
#api routes

# @app.get("/")
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

    


    
