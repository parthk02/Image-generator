import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// POST route for generating an image from text
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await axios.post(
            'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                },
                responseType: 'arraybuffer',  // Change to receive binary data
            }
        );

        // Convert the binary data to a base64 string
        const imageBuffer = Buffer.from(aiResponse.data, 'binary').toString('base64');
        const image = `data:image/jpeg;base64,${imageBuffer}`; // Adjust MIME type if necessary

        res.status(200).json({ photo: image });
    } catch (err) {
        console.error('Error generating image:', err.response ? err.response.data : err.message);
        res.status(500).send(err.response ? err.response.data.error : 'Error generating image');
    }
});

export default router;
