import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// GET route for testing server connection
router.route('/').get((req, res) => {
    res.send("Hello From Server");
});

// POST route for generating an image from text
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Make a POST request to the Hugging Face API using axios
        const aiResponse = await axios.post(
            'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',  // Replace with your actual Hugging Face model ID
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,  // Ensure this key is in your .env
                },
                responseType: 'json',  // Expecting a JSON response from the API
            }
        );

        // Extract the image from the response
        const image = aiResponse.data;  // Adjust based on the exact response format from your model

        res.status(200).json({ photo: image });
    } catch (err) {
        console.error('Error generating image:', err.response ? err.response.data : err.message);
        res.status(500).send(err.response ? err.response.data.error : 'Error generating image');
    }
});

export default router;
