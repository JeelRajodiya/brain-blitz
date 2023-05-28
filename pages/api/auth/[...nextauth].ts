import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;

async function storeInDB(user) {
    // Store the user in the
    const client = new MongoClient(uri);
    const database = client.db("brain-blitz");
    try {
        const users = database.collection("users");

        if ((await users.countDocuments({ email: user.email })) == 0) {
            await users.insertOne(user);
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    return true;
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
    secret: process.env.SECRET,
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken;
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            storeInDB(user).catch(console.error);
            console.log(user);
            return true;
        },
    },
};

export default NextAuth(authOptions);
