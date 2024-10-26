import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS for styling

// Load react-quill dynamically to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const DocumentEditor = ({ content, setContent }) => {

  // Custom toolbar configuration
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }], // Heading levels
    ['bold', 'italic', 'underline', 'strike'], // Text formatting
    [{ list: 'ordered' }, { list: 'bullet' }], // Lists
    ['link', 'blockquote', 'code-block'], // Link, Blockquote, Code
    [{ indent: '-1' }, { indent: '+1' }], // Indentation
    ['clean'], // Remove formatting
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleContentChange = (value) => {
    setContent(value); // Call the setter method from props to update content
  };

  useEffect(() => {
    // Any Quill-related manipulations can go here
  }, []);

  return (
    <div className="editor-container rounded">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        modules={modules}
        style={{ height: '300px', marginBottom: '50px' }}
      />

      <style jsx>{`
        .editor-container {
          margin: 0 auto;
        }
        .save-button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .save-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default DocumentEditor;
