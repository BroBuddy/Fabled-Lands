import { NavLink, useLocation } from "react-router-dom";
import { ScrollText, Castle, Zap, Map, Lock } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./NavBar.module.scss";

type Links = {
  to: string;
  label?: string;
  icon: ReactNode;
};

const links: Links[] = [
  { to: "/", icon: <Castle /> },
  { to: "/rule", icon: <ScrollText /> },
  { to: "/event", icon: <Zap /> },
  { to: "/codewords", icon: <Lock /> },
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
