import { auth } from "../auth";

const Server = async () => {
  const { data: session, loading } = await auth();
  console.log({ session, loading });
  return <div>{session?.accessToken}</div>;
};

export default Server;
