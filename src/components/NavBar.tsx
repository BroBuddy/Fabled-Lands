import { NavLink, useLocation } from "react-router-dom";
import { Castle, Map, Lock, History, Swords } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./NavBar.module.scss";

type Links = {
  to: string;
  label?: string;
  icon: ReactNode;
};

const links: Links[] = [
  { to: "/", icon: <Castle /> },
  { to: "/codewords", icon: <Lock /> },
  { to: "/combat", icon: <Swords /> },
  { to: "/history", icon: <History /> },
  { to: "/map", icon: <Map /> },
];

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navBar}>
      {links.map(({ to, label, icon }) => {
        const isActive = location.pathname === to;

        return (
          <NavLink
            key={to}
            to={to}
            style={{
              pointerEvents: isActive ? "none" : "auto",
              cursor: isActive ? "default" : "pointer",
            }}
            className={isActive ? styles.active : undefined}
          >
            <span>{icon ?? label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavBar;
