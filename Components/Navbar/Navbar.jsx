"use client";
import Link from "next/link";
import { SignInButton, SignOutButton } from "./AuthButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const NavItem = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "My Booking",
      link: "/booking",
    },
    {
      name: "Dashboard",
      link: '/dashboard'
    }
  ];
  return (
  
      <div className="navbar bg-base-100 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {NavItem.map((e, i) => (
                <li key={i}>
                  <a as={Link} href={e.link}>
                    {e.name}
                  </a>
                </li>
              ))}
              {session ? (
                <>
                  <li>
                    <SignOutButton />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <SignInButton />
                  </li>
                  <li>
                    <a className="">Register</a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Flypass</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {NavItem.map((e, i) => (
              <li key={i}>
                <a as={Link} href={e.link}>
                  {e.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {session ? (
            <>
              {session.user.email}
              <SignOutButton />
            </>
          ) : (
            <div className="flex gap-3">
              <SignInButton />

              <a className="btn btn-ghost">Register</a>
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Navbar;
