from flask import Flask, render_template, request

app = Flask(__name__)

# Sample questions and answers
questions = [
    {"question": "Mi az API rövidítése?", "answer": "Application Programming Interface"},
    {"question": "Milyen HTTP módszert használ az adatok lekérdezésére a REST API?", "answer": "GET"},
    # Add more questions here
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz', methods=['GET', 'POST'])
def quiz():
    if request.method == 'GET':
        return render_template('question.html', question=questions[0])
    elif request.method == 'POST':
        user_answer = request.form.get('answer', '').strip()
        correct_answer = questions[0]['answer']
        if user_answer.lower() == correct_answer.lower():
            feedback = "Helyes válasz! Az API rövidítése: Application Programming Interface."
        else:
            feedback = f"Nem helyes válasz. A helyes válasz: {correct_answer}."
        return render_template('question.html', question=questions[1], feedback=feedback)

if __name__ == '__main__':
    app.run(debug=True)
