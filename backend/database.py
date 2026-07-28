import mysql.connector


def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Akshit@44",
        database="Chinook"
    )
    return connection


def execute_query(sql):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(sql)

        result = cursor.fetchall()

        return result

    except Exception as e:
        return {
            "error": str(e)
        }

    finally:
        cursor.close()
        connection.close()