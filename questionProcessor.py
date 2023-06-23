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
ItoA = {0: "A", 1: "B", 2: "C", 3: "D"}
for question in questions['results']:
    newQuestion = {}
    newQuestion['quizId'] = quizId
    newQuestion['question'] = html.unescape(question['question'])
    newQuestion['id'] = question['question'].replace(" ", "")
    newQuestion['options'] = question['incorrect_answers'] + [
        question['correct_answer']
    ]
    random.shuffle(newQuestion['options'])
    newQuestion['correctOption'] = ItoA[newQuestion['options'].index(
        question["correct_answer"])]
    newQuestion['difficulty'] = question['difficulty'].capitalize()
    newJson.append(newQuestion)

json.dump(newJson, open("questionsModified.json", "+w"), indent=4)
