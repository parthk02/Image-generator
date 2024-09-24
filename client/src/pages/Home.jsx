// import React from 'react'

// const Home = () => {
//   return (
//     <div>Home</div>
//   )
// }

// export default Home
// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Recent Posts</h1>
        <Link to="/create-post">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create Post
          </motion.button>
        </Link>
      </header>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 shadow-md rounded-lg"
            >
              <h2 className="font-semibold text-xl">{post.name}</h2>
              <p>{post.prompt}</p>
              <img src={post.photo} alt={post.prompt} className="w-full h-auto mt-4 rounded-lg" />
            </motion.div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
