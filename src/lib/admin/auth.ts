// import CredentialsProvider from "next-auth/providers/credentials";
// import { JWTPayload, SignJWT, importJWK } from "jose";
// import { NextAuthOptions } from "next-auth";
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";

// interface AdminSession extends Session {
//   user: {
//     id: string;
//     jwtToken: string;
//     role: string;
//     email: string;
//     name: string;
//   };
// }

// // interface AdminToken extends JWT {
// //   uid: string;
// //   jwtToken: string;
// // }

// interface AdminUser {
//   id: string;
//   name: string;
//   email: string;
//   token: string;
// }

// const generateAdminJWT = async (payload: JWTPayload) => {
//   const secret = process.env.JWT_SECRET || "admin-secret";
//   const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

//   const jwt = await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("365d")
//     .sign(jwk);

//   return jwt;
// };

// async function validateAdmin(email: string, password: string) {
//   const adminEmail = process.env.ADMIN_EMAIL ;
//   const adminPassword = process.env.ADMIN_PASSWORD;

//   if (email === adminEmail && password === adminPassword) {
//     const jwt = await generateAdminJWT({ id: "admin" });
//     return {
//       id: "admin",
//       name: "Admin",
//       email: adminEmail,
//       token: jwt,
//     };
//   }
//   return null;
// }

// export const adminAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Admin Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         const user = await validateAdmin(credentials.email, credentials.password);
//         if (user) {
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET || "super-admin-secret",
//   callbacks: {
//     session: async ({ session, token }) => {
//       const adminSession: AdminSession = session as AdminSession;
//       if (token.uid) {
//         adminSession.user.id = token.uid;
//         adminSession.user.jwtToken = token.jwtToken;
//         adminSession.user.role = "admin";
//       }
//       return adminSession;
//     },
//     jwt: async ({ token, user }): Promise<JWT> => {
//       if (user) {
//         token.uid = user.id;
//         token.jwtToken = (user as AdminUser).token;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/admin-login",
//   },
// } satisfies NextAuthOptions;
