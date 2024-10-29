import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignIn from "../../../components/auth/Signin";
import NavBar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/footer";
const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <>
    <NavBar/>
      <SignIn />
      <Footer/>
    </>
  );
};

export default SigninPage;
