import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Define the types for the purchase data
interface Course {
  _id: string;
  appxCourseId: string;
  title: string;
  imageUrl: string;
  description: string;
  openToEveryone: boolean;
  price: number;
  // Add any other necessary fields from the course object
}

interface IPurchase {
  _id: string;
  buyerId: string;
  courseId: Course | null; // This can be a Course object or null
  paymentId: string;
  purchaseDate: string; // Keep it as a string since the API returns it as such
  __v: number;
}

const Purchase: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<IPurchase[] | null>(null);

  const fetchUserPurchase = async () => {
    const userId = session?.user?.id;
    if (userId) {
      try {
        const res = await fetch(`/api/getUserPurchase/${userId}`);
        const response: IPurchase[] = await res.json();
        setUserData(response);
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserPurchase();
    }
  }, [session]);

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-6 text-center">Your Purchases</h2>
    {userData && userData.length > 0 ? (
      <ul className="space-y-6">
        {userData.map((purchase) => (
          <li key={purchase._id} className="border border-gray-300 rounded-md shadow-md bg-white p-4 transition hover:shadow-lg">
            <div className="flex items-start space-x-4">
              {purchase.courseId && (
                <img
                  src={purchase.courseId.imageUrl}
                  alt={purchase.courseId.title}
                  className="w-32 h-32 object-cover rounded-md border border-gray-200"
                />
              )}
              <div className="flex-1">
                <p className="text-lg font-semibold"><strong>Purchase ID:</strong> {purchase._id}</p>
                <p className="text-gray-600"><strong>Payment ID:</strong> {purchase.paymentId}</p>
                <p className="text-gray-600">
                  <strong>Purchase Date:</strong> {new Date(purchase.purchaseDate).toLocaleString()}
                </p>
                <p className="text-gray-800">
                  <strong>Final Price:</strong> {purchase.courseId ? `$${purchase.courseId.price}` : 'N/A'}
                </p>
                <p className="text-gray-800"><strong>Buyer ID:</strong> {purchase.buyerId}</p>

                {/* Check if courseId is an object before rendering its properties */}
                {purchase.courseId ? (
                  <>
                    <p className="text-gray-800"><strong>Course Title:</strong> {purchase.courseId.title}</p>
                    <p className="text-gray-600"><strong>Description:</strong> {purchase.courseId.description}</p>
                  </>
                ) : (
                  <p className="text-gray-600"><strong>Course ID:</strong> Not specified</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-center">No purchases found.</p>
    )}
  </div>
  );
};

export default Purchase;
