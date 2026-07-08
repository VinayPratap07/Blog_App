import axios from "axios";
import("dotenv");

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//Blog API's
export const getAllBlogs = async () => {
  const res = await api.get("/api/blog/", {
    withCredentials: true,
  });
  return res.data;
};

export const getSingleBlog = async (id: string) => {
  const res = await api.get(`/api/blog/${id}`, {
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

export const getPopularPost = async () => {
  const res = await api.get("/api/blog/popularPost", {
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

export const getRecentPost = async () => {
  const res = await api.get("/api/blog/mostRecentBlogs", {
    withCredentials: true,
  });

  return res.data;
};

export const uploadBlog = async (data: {
  category: "Technology" | "Design" | "Art" | "Science";
  title: string;
  body: string;
  thumbnail: File;
}) => {
  const formData = new FormData();

  formData.append("category", data.category);
  formData.append("title", data.title);
  formData.append("body", data.body);
  formData.append("thumbnail", data.thumbnail);

  const res = await api.post("/api/blog/", formData, {
    withCredentials: true,
  });

  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await api.delete(`/api/blog/${id}`, {
    withCredentials: true,
  });
  return res;
};

export const heroBlog = async () => {
  const res = await api.get("/api/blog/heroBlog", {
    withCredentials: true,
  });
  return res.data;
};

//User API's
export const sendLoginReq = async (data: {
  identifier: string;
  password: string;
}) => {
  const res = await api.post("/api/user/login", data, {
    withCredentials: true,
  });
  console.log("hello");
  return res;
};

export const sendSignupReq = async (data: {
  fullName: string;
  username: string;
  email: string;
  description: string;
  password: string;
}) => {
  const res = await api.post("/api/user/register", data, {
    withCredentials: true,
  });
  console.log(res);
  return res;
};

export const getCurrentUser = async () => {
  const res = await api.get("/api/user/me", {
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post(
    "/api/user/logout",
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getUserProfileForVisit = async (id: string) => {
  const res = await api.get(`/api/user/${id}`, {
    withCredentials: true,
  });
  console.log(res.data);
  return res.data;
};

export const getAllUserProfile = async () => {
  const res = await api.get("/api/user/all", {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data;
};

//Comment API's
export const uploadComments = async ({
  id,
  data,
}: {
  id: string;
  data: {
    body: string;
  };
}) => {
  const res = await api.post(`/api/comment/${id}`, data, {
    withCredentials: true,
  });
  console.log(res);
  return res;
};

//Blog Like API
export const registerLike = async (id: string) => {
  const res = await api.post(
    `/api/blog/${id}/likes`,
    {},
    {
      withCredentials: true,
    },
  );

  return res.data;
};

export const unLikeBlog = async (id: string) => {
  const res = await api.delete(`/api/blog/${id}/likes`, {
    withCredentials: true,
  });
  return res.data;
};
