import express from 'express';
import fetch from 'node-fetch';

interface BusStop {
  id: string;
  name: string;
}

const app = express();
const PORT = process.env.PORT || 8000;

const API_KEY = '5da196d47f8f4e5facdb68d2e25b9eae';

app.get('/top-bus-lines', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.sl.se/api2/LineData.json?model=stop&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    console.log(data.ResponseData)

    if (!data || !data.ResponseData || !data.ResponseData.Result) {
      throw new Error('Invalid API response');
    }

    const busStops: BusStop[] = data.ResponseData.Result.map((busStop: any) => ({
      id: busStop.StopPointNumber,
      name: busStop.StopPointName,
    }));

    res.json(busStops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
