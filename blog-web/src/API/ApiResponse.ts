export interface userType {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
  description: string;
  createdAt: Date;
}

export interface blogType {
  _id: string;
  title: string;
  body: string;
  createdBy: userType;
  thumbnail: string;
  category: string;
  views: number;
  likeCount: number;
  createdAt: Date;
}
