import authOptions from "./api/auth/[...nextauth]/authOptions";
import CredentialsProvider from "next-auth/providers/credentials";

import { getServerSession } from "next-auth";

export const config = authOptions;

export function auth(...args) {
  return getServerSession(...args, config);
}
