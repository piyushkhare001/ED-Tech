import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';
//import { adminAuthOptions } from '@/lib/admin/auth'; // Import your adminAuthOptions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    // Use next-auth's signIn method to authenticate the admin
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      // Pass the adminAuthOptions if needed, but it's generally globally applied
    });

    if (result?.error) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    // Respond with the session data which includes the JWT token
    res.status(200).json({
      message: 'Login successful',
     // This is the JWT token you can use for authenticated routes
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
