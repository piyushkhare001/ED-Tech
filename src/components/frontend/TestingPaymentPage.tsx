
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface RazorpayButtonProps {
  amount: number;
}
interface RazorpayButtonProps {
  amount: number;
  userId: string | undefined;

}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ amount, userId }) => {

  const router = useRouter()
  useEffect(() => {
    // Dynamically load the Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const courseId = "670bdc7781def95e58eb0fa7";

  const handlePayment = async () => {
    // Fetch the order from your API
    const response = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount , courseId}), // Pass the amount to the API
    });
  
    // Check if the response is OK
    if (!response.ok) {
      const errorText = await response.text(); // Read the response as text
      console.error('Error creating order:', response.status, errorText);
      return;
    }
  
    // Parse the response as JSON
    const order = await response.json();
  
    if (!order) {
      console.error('Failed to create order');
      return;
    }
  
    // Ensure the Razorpay script has been loaded
    if (typeof window.Razorpay === 'undefined') {
      console.error('Razorpay SDK not loaded');
      return;
    }
  
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Use the public Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: order.id, // Use the order ID returned by the API
      handler: async function (response: any) {
        // Payment was successful, now verify it
        const verifyResponse = await fetch('/api/payment/verify-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courses: [], 
             courseId : courseId,
userId : userId
            // Add the courses or relevant data here
          }),
        });

        if (!verifyResponse.ok) {
          const errorText = await verifyResponse.text();
          console.error('Payment verification failed:', errorText);
          alert('Payment verification failed. Please try again.');
          return;
        }

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert('Payment successful and verified!');
          router.push('/ok')
        } else {
          alert('Payment verification failed. Please check your payment status.');
        }

      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      theme: {
        color: '#3399cc',
      },
      
    };

    
    const rzp = new window.Razorpay(options);
    rzp.open();

  
  };

  return (
    <button onClick={handlePayment} className="mt-4 p-2 bg-blue-600 text-white rounded">
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
