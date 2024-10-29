import SignUp from "../../../components/auth/Signup";
import NavBar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/footer";
const SignupPage = async () => {
  return (
    <>
     
      <NavBar/>
      <SignUp />
      <Footer/>
    </>
  );
};

export default SignupPage;
