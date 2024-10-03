import { useEffect } from 'react';

interface RazorpayButtonProps {
  amount: number;
}

const RazorpayButton: React.FC<RazorpayButtonProps> = ({ amount }) => {
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

  const handlePayment = async () => {
    // Fetch the order from your API
    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }), // Pass the amount to the API
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
      handler: function (response: any) {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
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
