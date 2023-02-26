import bcryptJs from "bcryptjs";
import User from "../models/user.model.js";

// create user
export const createUser = async (req, res) => {
  // get the user data from the request body
  const { username, email, password } = req.body;

  //   check if the fiels are empty
  try {
    if (!username === "" || !email === "" || !password === "") {
      // do something
      return res.status(400).json("All fields are required");
    } else {
      const salt = await bcryptJs.genSaltSync(10);
      const hashedPass = await bcryptJs.hashSync(password, salt);

      const newUser = new User({
        name: username,
        email,
        password: hashedPass,
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

// update a user

export const updateUser = async (req, res) => {
  try {
    // get user
    const userId = req.user._id;
    const paramId = req.params.userId;

    if (userId.toString() !== paramId)
      return res.status(403).json("Not authorized");

    User.findByIdAndUpdate(
      { id: userId },
      { $set: req.body },
      { new: true },
      (err, user) => {
        if (err || !user) return res.status(404).json("user was not found");

        res.status(200).json(user);
      }
    );
  } catch (err) {
    return res.status(500).json("server error");
  }
};

// delete a user
export const DeleteUser = async (req, res) => {
  // get user
  const userId = req.user._id;
  const paramId = req.params.userId;

  if (userId.toString() !== paramId)
    return res.status(403).json("Not authorized");

  try {
    const removedUser = await User.findByIdAndRemove({ id: userId });

    return res.status(200).json(removedUser);
  } catch (error) {
    return res.status(500).json("server error");
  }
};

// send verified user
export const VerifiedUser = async () => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("server error");
  }
};

// find all users
export const findAllUsers = (req, res) => {
  User.find()
    .limit(50)
    .select("-password")
    .then((users) => {
      if (users.length < 1) {
        return res.status(200).json("No available users");
      } else {
        return res.status(200).json(users);
      }
    });
};

// get user by Id
export const getUserById = async () => {
  try {
    const user = await User.findById({ _id: req.user.id }).select("-password");
    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("server error");
  }
};

// get user by Id
export const getAnyUserById = async () => {
  try {
    const user = await User.findById({ _id: req.params.userId }).select(
      "-password"
    );
    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("server error");
  }
};

export const followUser = async (req, res) => {
  const userId = req.params.userId;
  const currentUser = req.user._id;

  const user = await User.findById(userId);
  const current = await User.findById(currentUser);
  // check the user is followed

  if (user._id.toString() !== current._id.toString()) {
    if (!current.followings.includes(userId)) {
      await user.updateOne({ $push: { followers: currentUser } });
      await current.updateOne({ $push: { followings: userId } });
      const users = await User.find();
      return res.status(200).json({
        msg: "user has been followed",
        result: users,
      });
    } else {
      return res.status(403).json({
        msg: "you already follow this user",
      });
    }
  } else {
    return res.status(403).json({
      msg: "Skip the part where you follow yourself!",
    });
  }
};

export const unfollowUser = async (req, res) => {
  const userId = req.params.userId;
  const currentUser = req.user._id;

  const user = await User.findById(userId);
  const current = await User.findById(currentUser);
  // check the user is followed

  if (current.followings.includes(userId)) {
    await current.updateOne({ $pull: { followings: userId } });
    await user.updateOne({ $pull: { followers: currentUser } });
    const users = await User.find();
    return res.status(200).json({
      msg: "user has been unfollowed",
      result: users,
    });
  }
};
