import json
import random
import html

questions = json.load(open('questions.json'))
# data fetched from https://opentdb.com/api.php?amount=50&type=multiple
"""
 {
	  "difficulty": "hard",
	  "question": "What car manufacturer gave away their patent for the seat-belt in the interest of saving lives?",
	  "correct_answer": "Volvo",
	  "incorrect_answers": ["Ferrari", "Ford", "Renault"]
	},
(alias) type QuestionCol = {
	quizId: string;
	id: string;
	question: string;
	options: string[];
	correctOption: number;
	difficultyTag?: number;
}
"""

newJson = []
quizId = "d04814aa-dabc-4633-8d3e-33fa7f4d0d5d"
for question in questions['results']:
    newQuestion = {}
    newQuestion['quizId'] = quizId
    newQuestion['question'] = html.unescape(question['question'])
    newQuestion['id'] = question['question'].replace(" ", "")
    newQuestion['options'] = question['incorrect_answers'] + [
        question['correct_answer']
    ]
    random.shuffle(newQuestion['options'])
    newQuestion['correctOption'] = newQuestion['options'].index(
        question["correct_answer"])
    difficulty = question['difficulty']
    if difficulty == "easy":
        newQuestion['difficulty'] = 1
    elif difficulty == "medium":
        newQuestion['difficulty'] = 2
    elif difficulty == "hard":
        newQuestion['difficulty'] = 3
    newJson.append(newQuestion)

json.dump(newJson, open("questionsModified.json", "+w"), indent=4)
