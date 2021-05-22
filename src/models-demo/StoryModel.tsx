import { UserModel } from "./UserModel";

export type StoryModel = {
  imageUrl: string;
  user?: UserModel;
};
