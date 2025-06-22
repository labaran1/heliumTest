from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import os
from supabase import create_client, Client
from typing import Dict, Optional
# Load environment variables from .env
load_dotenv()



url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
app = FastAPI()

## This is the endpoint to get the localizations for a project and locale
## It returns a JSON object with the localizations for the project and locale
@app.get("/localizations/{project_id}/{locale}")
async def get_localizations(project_id: str, locale: str):
    try:
        response = supabase.table("translations") \
            .select("*") \
            .eq("id", project_id) \
            .single() \
            .execute()

        if response.error:
            raise HTTPException(status_code=404, detail="Translation key not found.")

        data = response.data
       
        main_language = data["key"]["language"]
        main_value = data["key"]["value"]

        if main_language == locale:
            return {data["key"]["language"]: main_value}

      
        translations = data.get("translations", {})
        translation_entry: Optional[Dict] = translations.get(locale)
        if translation_entry and translation_entry.get("value"):
            return {locale: translation_entry["value"]}
        return {}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/projects")
async def get_all_projects():
    try:
        response = supabase \
            .table("projects") \
            .select("*") \
            .execute()

        if response.error:
            raise HTTPException(status_code=500, detail=response.error.message)

        return response.data.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))