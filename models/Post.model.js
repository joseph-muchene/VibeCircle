import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  desc: {
    type: String,
    maxLength: 500,
  },
  img: {
    type: String,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  comments: [
    {
      commenterId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model("Post", PostSchema);

export default Post;
