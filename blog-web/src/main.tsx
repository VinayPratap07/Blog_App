import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/HomePage/HomePage.tsx";
import BlogPage from "./Components/BlogPage/BlogPage.tsx";
import { store } from "./Store/store.ts";
import { Provider } from "react-redux";
import SignupPage from "./Components/SignupPage/SignupPage.tsx";
import WriteBlogPage from "./Components/writeBlogPage/writeBlogPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.tsx";
import UserProfileVisitPage from "./Components/UserProfileVisitPage/UserProfileVisitPage.tsx";
import AllBlogPage from "./Components/AllBlogPage/AllBlogPage.tsx";
import AllUsersPage from "./Components/AllUsersPage/AllUsersPage.tsx";
import AboutPage from "./Components/AboutPage/AboutPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/blog/allBlogs",
        element: <AllBlogPage />,
      },
      {
        path: "/all/users",
        element: <AllUsersPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/blog/:id",
    element: <BlogPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/userProfile",
    element: <ProfilePage />,
  },
  {
    path: "/WriteBlog",
    element: <WriteBlogPage />,
  },
  {
    path: "/user/:id",
    element: <UserProfileVisitPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
