import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mognodb';
import { Lecture } from '@/models/Lecture'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); 

  const { title, description, videoUrl, courseId } = req.body;

  if (!title || !description || !videoUrl) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
 
    const newLecture = await Lecture.create({
      type: 'lecture',
      title,
      description,
      videoUrl,
      courseId,
    });

    await Lecture.findByIdAndUpdate(courseId, {
      $push: { lectures: newLecture._id }, 
    });

    return res.status(201).json({
      success: true,
      message: 'Lecture added successfully',
      data: newLecture,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error storing lecture', error });
  }
}


 // for  frontend reference 
// import { useState } from 'react';
// import axios from 'axios';

// const UploadLecture = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [videoFile, setVideoFile] = useState(null);

//   const handleFileChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       alert('Please upload a video file');
//       return;
//     }

//     // Upload video to Cloudinary
//     const formData = new FormData();
//     formData.append('file', videoFile);
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Cloudinary upload preset

//     // Upload video to Cloudinary
//     const uploadResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`, formData);
    
//     const videoUrl = uploadResponse.data.secure_url; // Get the video URL from response

//     // Submit lecture data to the backend
//     await fetch('/api/add-lecture', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, description, videoUrl }),
//     });

//     alert('Lecture added successfully!');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input type="file" accept="video/*" onChange={handleFileChange} required />
//       <button type="submit">Add Lecture</button>
//     </form>
//   );
// };

// export default UploadLecture;
