import mongoose from "mongoose";
let userSchema;
userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      maxLength: 64,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      unique: true,
      required: [true, "Email required"],
    },

    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid password! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.`,
      },
    },

    profileImage: {
      type: String,
    },

    about: {
      type: String,
      maxLength: 1024,
    },

    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
