import { Schema, model } from "mongoose";

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ]
  },
  {
    //Timestamps cria automaticamente no banco duas colunas (Data): createdAt e updatedAt
    timestamps: true
  }
);

module.exports = model("Dev", DevSchema);
//export default new Dev().DevSchema;
