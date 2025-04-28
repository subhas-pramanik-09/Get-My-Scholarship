# -*- coding: utf-8 -*-
"""
Created on Thu Apr 17 21:34:40 2025

@author: Subhas Pramanik
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import pickle
import csv
from fuzzywuzzy import fuzz

# Load Saved Model and Encoders
with open('saved_model.sav', 'rb') as f:
    model, le_state, le_category, le_qualification, le_type = pickle.load(f)

df = pd.read_csv('scholarship_data.csv')

# FastAPI Setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Scholarship Recommendation System"}

# ML Prediction Endpoint
@app.post("/recommend")
async def recommend(data: dict):
    try:
        state = data.get('state')
        category = data.get('category')
        qualification = data.get('qualification')
        income = data.get('income')
        type_ = data.get('type')

        input_data = [[
            le_state.transform([state])[0],
            le_category.transform([category])[0],
            le_qualification.transform([qualification])[0],
            income,
            le_type.transform([type_])[0]
        ]]
        predicted_name = model.predict(input_data)[0]
        result = df[df['Name'] == predicted_name].iloc[0]
        recommendation = {
            "Name": result['Name'],
            "Description": result['Description'],
            "LINKS": result['LINKS']
        }
        return recommendation
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Load CSV for Chatbot
def load_scholarships_from_csv(file_path):
    scholarships = []
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            scholarships.append({
                'id': row['ID'].strip(),
                'state': row['State'].strip(),
                'name': row['Name'].strip(),
                'category': row['Category'].strip(),
                'income': row['Income'].strip(),
                'qualification': row['Qualification'].strip(),
                'description': row['Description'].strip(),
                'links': row['LINKS'].strip(),
                'type': row['Type'].strip(),
            })
    return scholarships

scholarships = load_scholarships_from_csv('scholarship_data.csv')

# Chatbot Endpoint with Fuzzy Matching
@app.post("/chatbot")
async def chatbot(request: Request):
    try:
        data = await request.json()
        query = data.get("message", "").lower()

        filtered_scholarships = []
        for scholarship in scholarships:
            name = scholarship['name'].lower()
            category = scholarship['category'].lower()
            qualification = scholarship['qualification'].lower()
            description = scholarship['description'].lower()
            type_ = scholarship['type'].lower()
            state = scholarship['state'].lower()
            income = scholarship['income'].lower()

            match = (
                fuzz.partial_ratio(query, name) > 80 or
                fuzz.partial_ratio(query, category) > 80 or
                fuzz.partial_ratio(query, qualification) > 80 or
                fuzz.partial_ratio(query, description) > 80 or
                fuzz.partial_ratio(query, type_) > 80 or
                fuzz.partial_ratio(query, state) > 80 or
                (income.isdigit() and query.isdigit() and int(query) <= int(income))
            )

            if match:
                filtered_scholarships.append({
                    'name': scholarship['name'],
                    'description': scholarship['description'],
                    'qualification': scholarship['qualification'],
                    'category': scholarship['category'],
                    'income': scholarship['income'],
                    'links': scholarship['links']
                })

        if filtered_scholarships:
            return {
                'reply': {
                    'status': 'success',
                    'scholarships': filtered_scholarships[:3]
                }
            }
        else:
            return {
                'reply': {
                    'status': 'no_results',
                    'message': 'No scholarships found matching your query.'
                }
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
