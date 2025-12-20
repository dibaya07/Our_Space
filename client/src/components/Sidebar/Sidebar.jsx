import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHeart,
  FaUsers,
  FaBoxOpen,
  FaClock,
  FaListAlt,
  FaGamepad,
  FaChartBar,
  FaRegBookmark,
  FaHeartbeat,
  FaSmile
} from "react-icons/fa";
import "../.././layouts/MainLayout.css"; // single css file used by layout and sidebar

const items =  [
     { to: "/dashboard", label: "Dashboard", Icon: FaHeart },
      // { to: "/couple", label: "Couple Profile", Icon: FaUsers },
       { to: "/love-notes", label: "Love Notes", Icon: FaRegBookmark },
        { to: "/healing-zone", label: "Healing Zone", Icon: FaHeartbeat }, 
        { to: "/analytics", label: "Analytics", Icon: FaChartBar }, 
        { to: "/playtime", label: "Playtime", Icon: FaGamepad }, 
        { to: "/bucket", label: "Bucket & Wedding", Icon: FaListAlt },
         { to: "/timeline", label: "Timeline", Icon: FaClock }, 
         { to: "/memory-box", label: "Memory Box", Icon: FaBoxOpen }, 
         { to: "/mood", label: "Mood & Upset", Icon: FaSmile }, ];

export default function Sidebar({ collapsed = false, onToggle, onLinkClick, user, logout, mobile = false }) {
  return (
    <div className={`sidebar-component ${collapsed ? "collapsed" : "expanded"}`}>
      <nav className="nav" aria-label="Main navigation">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => onLinkClick && onLinkClick()}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <div className="icon-tile">
              <Icon className="tile-icon" />
            </div>
            {(!collapsed || mobile) && <div className="item-label">{label}</div>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">{user?.name?.[0]?.toUpperCase?.() || "💑"}</div>

        {!collapsed && (
          <div className="user-section">
            <div className="user-name">{user?.name || "Love User"}</div>
            {/* <div className="user-email">{user?.email || "Keep loving gently"}</div> */}
          </div>
        )}

        {!collapsed && (
          <div style={{ marginLeft: "auto" }}>
            <button className="logout-btn" onClick={() => logout?.()}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
 