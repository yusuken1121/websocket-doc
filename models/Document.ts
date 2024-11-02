import { Schema, model } from "mongoose";
import { UserDocument } from "./User";

export interface DocumentDocument {
  _id: string;
  title: string;
  content: string;
  shared: boolean;
  activeUsers: UserDocument[];
}

const DocumentSchema = new Schema<DocumentDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true, default: "" },
    shared: { type: Boolean, default: false },
    activeUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const DocumentModel = model<DocumentDocument>("Document", DocumentSchema);

export default DocumentModel;
