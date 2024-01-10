import { createBrowserRouter } from "react-router-dom";

import SplashScreenPage from "./pages/SplashScreenPage";
import LoginPage from "./pages/LoginPage";
import CrudPostPage from "./pages/CrudPostPage";
import UserListPage from "./pages/UserListPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SplashScreenPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/crud-post",
        element: <CrudPostPage />,
    },
    {
        path: "/user-list",
        element: <UserListPage />
    }
]);

export default router;