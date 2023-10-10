// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from 'cors';

// import dalleRoutes from './routes/dalle.routes.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limig: "50mb" }))

// app.use('/api/v1/dalle', dalleRoutes);

// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Hello from DALL.E" })
// })

// app.listen(8080, () => console.log('Server has started on port 8080'))

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Replace 'YOUR_MONSTER_API_KEY' with your actual Monster API key
const MONSTER_API_KEY = 'SADIYA_1109';

app.post('/generate-image', async (req, res) => {
  try {
    const { text } = req.body;

    // Make a request to the Monster API to generate an image
    const response = await axios.post(
      'https://api.monsterapi.ai/v1/generate/txt2img',
      { text },
      {
        headers: {
          accept: 'application/json',
          // 'content-type': 'application/json',
          authorization: `Bearer ${MONSTER_API_KEY}`,
        },
      }
    );

    if (
      response.status === 200 &&
      response.data &&
      response.data.data &&
      response.data.data.image_url
    ) {
      res.status(200).json({ image_url: response.data.data.image_url });
    } else {
      res.status(500).json({ error: 'Image generation failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Monster API' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server has started on port ${port}`));

// app.use("/v1/images/generations", dalleRoutes);

// app.get('/', (req, res) => {
//   res.status(200).json({ message: "Hello from DALL.E" })
// })

// app.listen(8080, () => console.log('Server has started on port 8080'))