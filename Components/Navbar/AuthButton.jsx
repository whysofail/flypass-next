import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const SignInButton = () => {
  return (
    <Link href="/api/auth/signin" className="btn">
      Sign In
    </Link>
  );
};

export const SignOutButton = () => {
  return (
    <Link className="btn" href="/api/auth/signout?callbackUrl=/">
      Sign Out
    </Link>
  );
};

// Export as default
const AuthButton = { SignInButton, SignOutButton };
export default AuthButton;
