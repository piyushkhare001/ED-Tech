// File: /pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
//import Razorpay from 'razorpay';
import crypto from 'crypto';

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields for verification' });
    }

    try {
      // Create HMAC and verify signature
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature === razorpay_signature) {
        // Payment verified successfully
        return res.status(200).json({ message: 'Payment verified successfully!' });
      } else {
        // Verification failed
        return res.status(400).json({ error: 'Payment verification failed!' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error verifying payment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
