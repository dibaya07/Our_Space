import React from "react";
import { Outlet, Link } from "react-router-dom";

/**
 * AuthLayout - A layout component that wraps the authentication pages with a consistent design.
 * It includes a top brand bar, a main auth container and a footer.
 * The main auth container contains a left section with marketing text and a right section that renders the Login/Register page.
 * The footer contains a small note about the data being private.
 */
export default function AuthLayout() {
  return (
    <Outlet />
  );
}
