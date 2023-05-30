import { MongoClient } from "mongodb";
import { User } from "next-auth";
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

type UserCol = {
    email: string;
    id: string;
    name: string;
    dateOfJoining: Date;
    sessions: string;
    image: string;
    accessToken: string;
    idToken: string;
    createdAt: Date;
};

export function getDB() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    return client.db("brain-blitz");
}

export async function getUser(email: string) {
    const db = await getDB();
    const user = await db.collection<UserCol>("users").findOne({ email });
    return user;
}
