// // File: /pages/api/create-order.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import Razorpay from 'razorpay';

// type Data = {
//   orderId?: string;
//   amount?: number;
//   currency?: string;
//   error?: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//   if (req.method === 'POST') {
//     const { amount } = req.body;

//     if (!amount) {
//       return res.status(400).json({ error: 'Amount is required' });
//     }

//     try {
//       // Initialize Razorpay instance
//       const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID as string, // Add type assertion
//         key_secret: process.env.RAZORPAY_KEY_SECRET as string,
//       });

//       // Create an order
//       const options = {
//         amount: amount * 100, // Amount is in paise, so multiply by 100
//         currency: 'INR',
//         receipt: `receipt_order_${new Date().getTime()}`,
//       };

//       const order = await razorpay.orders.create(options);

//       // Send back the order ID and amount
//       return res.status(200).json({
//         orderId: order.id,
//         amount,
//         currency: order.currency,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Error creating Razorpay order' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, // Ensure your key_id is set
  key_secret: process.env.RAZORPAY_SECRET_ID,
});

export async function POST(req: Request) {
  const { amount } = await req.json();

  if (!amount) {
    return new Response(JSON.stringify({ error: 'Amount is required' }), { status: 400 });
  }

  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'receipt#1',
      payment_capture: 1, // Automatically capture payment
    };

    const order = await razorpay.orders.create(options);
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error:any) {
    console.error('Error creating order:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
