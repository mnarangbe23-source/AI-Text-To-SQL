import ollama

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

    response = ollama.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        options={
            "temperature": 0
        }
    )

    sql = response["message"]["content"].strip()

    sql = sql.replace("```sql", "")
    sql = sql.replace("```", "")
    sql = sql.strip()

    return sql