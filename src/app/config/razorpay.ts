import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, // Public key
  key_secret: process.env.RAZORPAY_SECRET_ID as string, // Secret key
});

export { instance };