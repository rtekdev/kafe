import { Col, Container, Nav } from "react-bootstrap";
import "./Navigation.scss";
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, userActions } from "../../store/user-redux";
import { useAppSelector } from "../../store";
import Cart from "../Shop/Cart";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const token = useRouteLoaderData("root");
  const userRedux = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      setUser((prev) => userRedux);
    }
  }, [token, userRedux]);

  const handleOnOpenCart = () => {
    dispatch(userActions.openCart());
  };

  return (
    <>
      {token && <Cart />}
      <Nav>
        <Container>
          <Col>
            <Link to="/shop" className="brand_logo">
              <img src="/images/logo.png" alt="Kafe's Logo" />
              <span className="brand_name">Kafé</span>
            </Link>
          </Col>
          <Col className="nav__links">
            <NavLink
              to="/shop/menu"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Menu
            </NavLink>
            <NavLink
              to="/shop/coffee"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Kawa
            </NavLink>
            <NavLink
              to="/shop/delivers"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dostawy
            </NavLink>
            <NavLink
              to="/shop/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Kontakt
            </NavLink>
          </Col>
          <Col className="nav__extra">
            <div className="nav__search">
              <button>
                <img src="/images/search_loup.png" />
              </button>
              <input placeholder="Szukaj" type="text" />
            </div>
            {token && (
              <button
                type="button"
                onClick={handleOnOpenCart}
                className={`shopping_bag ${
                  user && user?.cart.length > 0 ? "active" : undefined
                }`}
              >
                <PiShoppingBagOpenFill />
              </button>
            )}
            <Link
              to={!token ? "/auth?mode=login" : "/dashboard/orders"}
              className="nav__profile"
            >
              <img src="/images/circle-user.png" alt="User Redirect Image" />
            </Link>
          </Col>
        </Container>
      </Nav>
    </>
  );
};

export default Navigation;
