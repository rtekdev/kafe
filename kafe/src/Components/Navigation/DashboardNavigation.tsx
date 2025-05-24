import React, { useEffect, useRef, useState } from "react";
import { Col, Stack } from "react-bootstrap";
import { Form, Link, NavLink, useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { CiCoffeeBean, CiDiscount1 } from "react-icons/ci";
import { TbHelp } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { PiUsers } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";

import DashboardNavigationTile from "./DashboardNavigationTile";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-redux";
import { useAppSelector } from "../../store";

import "./DashboardNavigation.scss";

interface PathItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface NavGroup {
  name: string;
  paths: PathItem[];
}

const navItems: NavGroup[] = [
  {
    name: "Menu",
    paths: [
      { path: "home", label: "Dashboard", icon: <MdDashboard /> },
      { path: "orders", label: "Orders", icon: <AiOutlineGlobal /> },
    ],
  },
  {
    name: "Admin",
    paths: [
      { path: "products", label: "Products", icon: <CiCoffeeBean /> },
      { path: "users", label: "Users", icon: <PiUsers /> },
      { path: "discounts", label: "Discounts", icon: <CiDiscount1 /> },
    ],
  },
  {
    name: "General",
    paths: [
      { path: "settings", label: "Settings", icon: <IoSettingsOutline /> },
      { path: "help", label: "Help", icon: <TbHelp /> },
      { path: "logout", label: "Logout", icon: <FiLogOut /> },
    ],
  },
];

const DashboardNavigation: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [paths, setPaths] = useState<NavGroup[]>(navItems);
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicatorTop, setIndicatorTop] = useState<number>(0);

  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (user && user.role !== 0 && user.role !== 3) {
      setPaths([navItems[0], navItems[2]]);
    }
  }, [user]);

  const activePath = hovered ?? location.pathname.split("/")[2] ?? "";

  useEffect(() => {
    const activeEl = itemRefs.current[activePath];
    const container = navRef.current;
    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    setIndicatorTop(activeRect.top - containerRect.top);
  }, [activePath, hovered, paths]);

  return (
    <nav
      ref={navRef}
      className="dashboard__nav bgc--light_grey sidebar"
      style={{ position: "relative" }}
    >
      <Stack direction="vertical" gap={5}>
        <Col>
          <Link to="/shop" className="brand_logo">
            <img src="/images/logo.png" alt="Kafe's Logo" />
            <span className="brand_name">Kafé</span>
          </Link>
        </Col>

        <div
          className="nav-indicator"
          style={{
            position: "absolute",
            top: indicatorTop,
            height: itemRefs.current[activePath]?.clientHeight ?? 0,
          }}
        />

        {paths.map((group) => (
          <Col className="links" key={group.name}>
            <h5>{group.name.toUpperCase()}</h5>
            <ul onMouseLeave={() => setHovered(null)}>
              {group.paths.map((p) => (
                <li
                  key={p.path}
                  data-path={p.path}
                  ref={(el: HTMLLIElement | null): void => {
                    itemRefs.current[p.path] = el;
                  }}
                  onMouseEnter={() => setHovered(p.path)}
                >
                  {p.path !== "logout" ? (
                    <NavLink
                      to={p.path}
                      className={({ isActive }) =>
                        isActive || hovered === p.path ? "selected" : ""
                      }
                    >
                      {p.icon}
                      <span>{p.label}</span>
                    </NavLink>
                  ) : (
                    <Form method="post" action="/logout">
                      <button
                        type="submit"
                        className={hovered === p.path ? "selected" : ""}
                        onClick={() => dispatch(userActions.clearUser())}
                      >
                        {p.icon}
                        <span>Logout</span>
                      </button>
                    </Form>
                  )}
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Stack>

      <DashboardNavigationTile heading="~Kafé" text="Smacznej kawusi!" />
    </nav>
  );
};

export default DashboardNavigation;
