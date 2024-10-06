import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignIn from "../../../components/auth/Signin";
const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <>
      <SignIn />
    </>
  );
};

export default SigninPage;
