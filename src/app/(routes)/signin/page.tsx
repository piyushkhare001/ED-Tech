// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import Signin from "@/components/auth/Signin";
import React from "react";

const SigninPage = async () => {
  //   const session = await getServerSession(authOptions);
  //   if (session?.user) {
  //     redirect("/");
  //   }
  return <Signin />;
};

export default SigninPage;
