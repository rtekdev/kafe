import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/Root";
import { tokenLoader } from "./util/auth";
import AuthenticationPage, {
  action as authAction,
  fetchUser,
} from "./Pages/Authentication";
import { action as logoutAction } from "./Pages/Logout";
import HomePage from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import CoffeePage from "./Pages/Coffee";
import DeliversPage from "./Pages/Delivers";
import ContactPage from "./Pages/Contact";
import MenuPage, { loader as productLoader } from "./Pages/Shop/Menu/Menu";
import DrinksPage from "./Pages/Shop/Menu/Drinks";
import DrinkDetailsPage, {
  loader as productDetailsLoader,
} from "./Pages/Shop/Menu/DrinkDetails";
import ShopRoot from "./Pages/Shop/ShopRoot";
import DashboardRoot from "./Pages/Dashboard/DashboardRoot";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { User, userActions } from "./store/user-redux";
import UsersPage, {
  loader as usersLoader,
} from "./Pages/Dashboard/Admin/Users";
import ProductsPage, {
  loader as productsLoader,
} from "./Pages/Dashboard/Admin/Products";
import OrdersDashboard from "./Pages/Dashboard/User/Orders";
import HelpDashboard from "./Pages/Dashboard/General/Help";
import SettingsDashboard from "./Pages/Dashboard/General/Settings";
import Discounts, {
  loader as discountsLoader,
} from "./Pages/Dashboard/Admin/Discounts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "shop",
        element: <ShopRoot />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "menu",
            children: [
              { index: true, element: <MenuPage />, loader: productLoader },
              {
                path: "drinks",
                element: <DrinksPage />,
              },
              {
                path: "drinks/:id",
                id: "drink-detail",
                element: <DrinkDetailsPage />,
                loader: productDetailsLoader,
              },
            ],
          },
          { path: "coffee", element: <CoffeePage /> },
          { path: "delivers", element: <DeliversPage /> },
          { path: "contact", element: <ContactPage /> },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardRoot />,
        children: [
          { path: "home", element: <></> },
          { path: "orders", element: <OrdersDashboard /> },
          {
            path: "products",
            element: <ProductsPage />,
            loader: productsLoader,
          },
          { path: "users", element: <UsersPage />, loader: usersLoader },
          {
            path: "discounts",
            element: <Discounts />,
            loader: discountsLoader,
          },
          { path: "help", element: <HelpDashboard /> },
          { path: "settings", element: <SettingsDashboard /> },
        ],
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction, element: <div /> },
    ],
  },
]);

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem("user_username");

    async function loadUser(username: string) {
      const user: User = await fetchUser(username);
      if (user) dispatch(userActions.setUser(user));
    }

    if (storedUsername) loadUser(storedUsername);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
