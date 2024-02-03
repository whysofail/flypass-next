import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useLogout from "@/app/Hooks/Logout";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const NavItem = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Booking",
      link: "/booking",
    },
  ];
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <div>
      <div className="navbar bg-base-100">
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
                    <a href="" className="btn" onClick={() => handleLogout()}>
                      Sign Out
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a as={Link} href="/login">
                      Login
                    </a>
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
              <a href="" className="btn" onClick={handleLogout}>
                Sign Out
              </a>
            </>
          ) : (
            <div className="flex gap-3">
              <a as={Link} href="/login" className="btn">
                Login
              </a>

              <a className="btn btn-ghost">Register</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
