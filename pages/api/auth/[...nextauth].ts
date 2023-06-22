import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
import { uri } from "../../../util/DB";
import { UserCol } from "../../../util/DB";

async function storeInDB(user: UserCol) {
  const client = new MongoClient(uri);
  try {
    await await client.connect();
    const database = client.db("brain-blitz");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email: user.email });

    if (!existingUser) {
      const date = new Date();
      user.createdAt = date;
      await users.insertOne(user);
    }
  } catch (error) {
    console.error("Error storing user in the database:", error);
  } finally {
    await client.close();
  }
  return true;
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Missing env.GOOGLE_CLIENT_ID");
} else if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing env.GOOGLE_CLIENT_SECRET");
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
      // console.log(account);
      const access_token = account.access_token;
      const id_token = account.id_token;
      // console.log(access_token, id_token);
      user.accessToken = access_token;
      user.idToken = id_token;
      try {
        await storeInDB(user as UserCol);
        // console.log("User stored in the database:", user);
      } catch (error) {
        console.error("Error storing user in the database:", error);
      }
      return true;
    },
  },
};

export default NextAuth(authOptions as AuthOptions);
