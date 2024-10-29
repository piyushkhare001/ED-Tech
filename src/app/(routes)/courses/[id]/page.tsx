
'use client'; 
import Alert from "@/components/ui/alertTeacherCourse";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'; 
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NavBar from "@/components/frontend/Navbar";
import Footer from "@/components/frontend/footer";
type Course = {
  _id: string;
  appxCourseId: string;
  title: string;
  imageUrl: string;
  description: string;
  openToEveryone: boolean;
  price: number;
  certIssued: boolean;
  createdBy: string;
};

const CourseBuy = () => {
  const { id } = useParams(); 
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [handleAlert, setHandleAlert] = useState({
    color: "",
    message: "",
    visible: false,
  });

  const amount = course?.price;
   const courseId = id
  const session  =  useSession()
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

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const response = await fetch(`/api/course/fetchedClick/${id}`);
      
          // Log the response status
          console.log('Response Status:', response.status);
      
          // Check if response is OK (status code 200-299)
          if (!response.ok) {
            const errorData = await response.text(); // Get the response as text
            console.error('Error response body:', errorData);
            throw new Error(errorData || 'Failed to fetch course');
          }
      
          const data = await response.json(); // Only parse if the response is OK
          console.log('Fetched Data:', data);
      
          setCourse(data.data); // Set the fetched course data
        } catch (error: any) {
          console.error('Error fetching course:', error);
          setError(error.message || 'An error occurred while fetching course data.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchCourse();
    }
  }, [id]);

  const handlePayment = async () => {
   if(session && session?.data?.user?.role === "student"){
   const userId = session?.data?.user?.id;
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
     
      setHandleAlert({
        color: "red",
        message: "user already enroll in this course",
        visible: true,
      });
      return;
    }
  
    // Parse the response as JSON
    const order = await response.json();
  
    if (!order) {
      setHandleAlert({
        color: "red",
        message: "failed to create order ! please try again",
        visible: true,
      });
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
          setHandleAlert({
            color: "red",
            message:'Payment verification failed:' ,
            visible: true,
          });
          return;
        }

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          setHandleAlert({
            color: "green",
            message: "payment successfully completed ",
            visible: true,
          });
          router.push('/dashboard')
        } else {
          alert('Payment verification failed. Please check your payment status.');
        }

      }

      
    };

    
    const rzp = new window.Razorpay(options);
    rzp.open();

   }
   else{
    setHandleAlert({
      color: "red",
      message: "you are not login please login first",
      visible: true,
    });
   }
  };
 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log( "course ",course)
  return (
    <>
    <NavBar/>
    <div className="p-8 bg-gray-100 min-h-screen">
          <Alert
          message={handleAlert.message}
          visible={handleAlert.visible}
          color={handleAlert.color}
        />
      {/* Course Banner */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {course?.imageUrl && (
          <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover" />
        )}
        {/* Course Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-black">{course?.title}</h1>
          <p className="text-gray-600 mb-4">{course?.description}</p>

          <div className="flex items-center justify-between mb-6">
            <span
              className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                course?.openToEveryone ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {course?.openToEveryone ? 'Open to Everyone' : 'Restricted Access'}
            </span>
          </div>

          {/* Price & Purchase Button */}
          <div className="flex items-center justify-between">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
              onClick={handlePayment} // Placeholder for payment logic
            >
              Amount: {course?.price} {' Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CourseBuy;
