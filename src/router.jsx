import { createBrowserRouter } from "react-router-dom";

import SplashScreenPage from "./pages/SplashScreenPage";
import LoginPage from "./pages/LoginPage";
import CrudPostPage from "./pages/CrudPostPage";

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
]);

export default router;