import { NotFoundError } from "../util/errors.js";
import User from "../Models/User.js";

export const add = async (data) => {
  const user = await addUser(data);
  if (!user) {
    return res.status(400).json({
      message: "User signup failed while creating new user in database.",
    });
  }

  return { username: data.username };
};

export const getById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    console.error("Error while fetching user by id:", error);
    throw error;
  }
};

export const getByUsername = async (username) => {
  const user = await readUserByUsername(username);

  if (!user) {
    throw new NotFoundError("Could not find user for username " + username);
  }

  return user;
};

export const getByEmail = async (email) => {
  const users = await readUsers();
  if (users.length === 0) {
    throw new NotFoundError("Could not find any users");
  }

  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new NotFoundError("Could not find user for email " + email);
  }

  return user;
};

export const readUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw error;
  }
};

export const readUserByUsername = async (username) => {
  try {
    return await User.findOne({ username })
      .populate("cart.originalProduct")
      .exec();
  } catch (error) {
    console.error("Error while fetching user by username:", error);
    throw error;
  }
};

export const addUser = async (data) => {
  const newUser = new User({
    username: data.username,
    email: data.email,
    password: data.password,
  });

  try {
    return await newUser.save();
  } catch (error) {
    console.error("Error while creating new user", error);
    return false;
  }
};

export const findAndUpdate = async (id, data) => {
  const { username, email } = data;
  try {
    const user = User.findByIdAndUpdate(
      id,
      {
        username,
        email,
      },
      { new: true, runValidators: true, context: "query" }
    );

    if (!user) return false;

    return user;
  } catch (error) {
    return false;
  }
};
