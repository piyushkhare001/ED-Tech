'use client'; // For Next.js 13 (App Directory)

import { useState , useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';


export default function CreateCoursePage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [openToEveryone, setOpenToEveryone] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');



  const { data: session, status } = useSession();
  
console.log("session" , session)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');


  if (!session) {
    setError('Unauthorized. Please log in.');
    setLoading(false);
    return;
  }

  const courseData = {
    title,
    imageUrl,
    description,
    openToEveryone,
    price,
  };

  try {
    const response = await fetch('/api/course/coordinator/create-course', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    if (response.ok) {
      const data = await response.json();
      setSuccess('Course created successfully!');
      setTitle('');
      setImageUrl('');
      setDescription('');
      setOpenToEveryone(false);
      setPrice(0);

      console.log(data)
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to create the course.');
    }
  } catch (error: any) {
      console.log(error)
    setError('An error occurred while creating the course.');
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
      signIn();
  }
}, [status]);

if (status === 'loading') {
  return <p>Loading...</p>;
}

if (session && session.user.role === "teacher") {
  return (
   <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Course</h1>

       <form onSubmit={handleSubmit} className="space-y-4">
         {error && <div className="text-red-600">{error}</div>}
         {success && <div className="text-green-600">{success}</div>}

         <div>
           <label className="block text-sm font-medium">Course Title</label>
           <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 p-2 w-full border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Open to Everyone</label>
          <input
            type="checkbox"
            className="ml-2"
            checked={openToEveryone}
            onChange={(e) => setOpenToEveryone(e.target.checked)}
          />
         </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            className="mt-1 p-2 w-full border rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded ${
            loading ? 'opacity-50' : ''
           }`}
           disabled={loading}
         >
          {loading ? 'Creating Course...' : 'Create Course'}
         </button>
      </form>
    </div>
  );
}

return <h1> this is protected route for teachers you can not acess this page</h1>; // Or show a message like "You are not authenticated"
}

