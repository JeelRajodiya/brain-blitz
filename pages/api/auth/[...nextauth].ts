import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

async function storeInDB(user) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("brain-blitz");
        const users = database.collection("users");

        const existingUser = await users.findOne({ email: user.email });

        if (!existingUser) {
            await users.insertOne(user);
        }
    } catch (error) {
        console.error("Error storing user in the database:", error);
    } finally {
        await client.close();
    }
    return true;
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                await storeInDB(user);
                console.log("User stored in the database:", user);
            } catch (error) {
                console.error("Error storing user in the database:", error);
            }
            return true;
        },
    },
};

export default NextAuth(authOptions);
