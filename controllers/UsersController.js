#!/usr/bin/node
import crypto from "crypto";
import dbClient from "../utils/db.js";

class UsersController {
  async postNew(req, res) {
    const { email, password } = await req.body;
    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }

    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    try {
      
      const usersCollection = await dbClient.getCollection("users");
      // Check if email already exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Already exist" });
      }
      // Hash password
      const hashedPassword = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");
      // Insert new user
      const result = await usersCollection.insertOne({
        email,
        password: hashedPassword,
      });
      // Return the new user with email and id
      const newUser = { id: result.insertedId, email };
      return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

const usersController = new UsersController();
export default usersController;
