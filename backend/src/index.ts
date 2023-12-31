import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { Stop, Line } from "../types";

const app = express();
const PORT = process.env.PORT || 8000;

const API_KEY = process.env.API_KEY;

app.use(cors());

app.get("/top-bus-lines", async (req, res) => {
  try {
    const linesResponse = await fetch(
      `https://api.sl.se/api2/LineData.json?model=line&key=${API_KEY}`
    );
    if (!linesResponse.ok) {
      throw new Error('Failed to fetch lines data');
    }
    const linesData: {
      ResponseData: { Result: Line[] };
    } = await linesResponse.json();
    const lines: Line[] = linesData.ResponseData.Result;

    const stopsResponse = await fetch(
      `https://api.sl.se/api2/LineData.json?model=stop&key=${API_KEY}`
    );
    if (!stopsResponse.ok) {
      throw new Error('Failed to fetch stops data');
    }
    const stopsData: {
      ResponseData: { Result: Stop[] };
    } = await stopsResponse.json();
    const stops: Stop[] = stopsData.ResponseData.Result;

    const lineStops: { [lineNumber: string]: string[] } = {};
    stops.forEach((stop) => {
      stop.StopPointNumber.split(',').forEach((lineNumber) => {
        if (!lineStops[lineNumber]) {
          lineStops[lineNumber] = [];
        }
        lineStops[lineNumber].push(stop.StopPointName);
      });
    });

    const sortedLineNumbers = Object.keys(lineStops).sort(
      (a, b) => lineStops[b].length - lineStops[a].length
    );

    const top10LineNumbers = sortedLineNumbers.slice(0, 10);

    const top10LinesWithStops = top10LineNumbers.map((lineNumber) => {
      const line = lines.find((line) => line.LineNumber === lineNumber);
      const stops = lineStops[lineNumber];

      return {
        lineNumber: lineNumber,
        numStops: stops.length,
        stops: stops,
      };
    });

    res.json(top10LinesWithStops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
