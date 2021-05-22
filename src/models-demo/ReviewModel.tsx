import { UserModel } from "./UserModel";

export type ReviewModel = {
  user: UserModel;
  rating: number;
  comment: string;
};
