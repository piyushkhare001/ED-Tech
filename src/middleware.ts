import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/courses/:path*"],
};

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;
  const token = req.nextauth.token;
  if (!token) {
    return NextResponse.redirect(new URL("/invalidsession", req.url));
  }
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/user?token=${token.jwtToken}`
  );

  const json = await user.json();
  if (!json.user) {
    return NextResponse.redirect(new URL("/invalidsession", req.url));
  }
});

// THis will be used in future versions for checking admin and teacher credentials
// import { NextApiRequest, NextApiResponse } from 'next';
// import { User, IUser } from '../models';

// export async function isAdmin(req: NextApiRequest, res: NextApiResponse, next: () => void) {
//   const user: IUser | null = await User.findById(req.body.userId);
//   if (user && user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Access denied' });
//   }
// }

// export async function isTeacher(req: NextApiRequest, res: NextApiResponse, next: () => void) {
//   const user: IUser | null = await User.findById(req.body.userId);
//   if (user && (user.role === 'teacher' || user.role === 'admin')) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Access denied' });
//   }
// }
