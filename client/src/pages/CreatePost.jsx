// CreatePost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreatePost = () => {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null); // State for the generated image
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/hugface', { prompt }, {
        headers: {
          'Content-Type': 'application/json' // Ensure you're sending the right content type
        },
      });
      
      // Log the entire response to check its structure
      console.log('Full API Response:', response);

      // Check if the response contains the image URL or base64 string
      const generatedPhoto = response.data.photo; // Adjust based on the API response structure

      // If it's a base64 string, prepend the data URI scheme
      if (generatedPhoto && generatedPhoto.startsWith('data:image')) {
        setGeneratedImage(generatedPhoto);
      } else {
        // Handle other types of responses (like binary blobs or URLs)
        console.error('Invalid image format:', generatedPhoto);
        setGeneratedImage(null); // Clear the image if invalid
      }

      setLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="max-w-md mx-auto"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Create a Post</h1>
      <motion.form
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium">Name (Optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Prompt</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-[#6469ff] text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </motion.button>
      </motion.form>

      {/* Display the generated image if available */}
      {generatedImage && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Generated Image:</h2>
          <img src={generatedImage} alt={prompt} className="w-full h-auto mt-4 rounded-lg" />
        </div>
      )}
    </motion.div>
  );
};

export default CreatePost;
