export interface IUser {
  email: string;
  id: number;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAd: Date;
  hash: string;
}
