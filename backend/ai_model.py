import os
from dotenv import load_dotenv
from groq import Groq


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


SCHEMA = """
Database Schema

artist(artist_id, name)

album(album_id, title, artist_id)

customer(customer_id, first_name, last_name, company,
address, city, state, country, postal_code,
phone, fax, email)

track(track_id, name, album_id, media_type_id,
genre_id, composer, milliseconds,
bytes, unit_price)

genre(genre_id, name)
"""


def generate_sql(question):

    prompt = f"""
You are an expert MySQL assistant.

Convert the user's question into ONE valid MySQL SELECT query.

Rules:
- Return ONLY SQL.
- No explanation.
- No markdown.
- Use only the tables below.
- Never invent table names.
- Prefer SELECT statements.

{SCHEMA}

Question:
{question}

SQL:
"""


    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0

    )


    sql = response.choices[0].message.content.strip()


    sql = sql.replace("```sql", "")
    sql = sql.replace("```", "")
    sql = sql.strip()


    return sql