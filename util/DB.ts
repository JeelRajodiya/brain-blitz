import { MongoClient } from "mongodb";
export type QuizCol = {
    title: string;
    userId: string; // the user's id who created the quiz
    id: string;
    difficultyTags: boolean;
    isPoll: boolean;
    jumpQuestions: boolean;
    timeForAQuestion: number; // in seconds, 5 means you have 5 seconds to solve each question, default 30s
    markForCorrect: number; // default +4
    markForIncorrect: number; // default -1
};
export function getDB() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    return client.db("brain-blitz");
}
