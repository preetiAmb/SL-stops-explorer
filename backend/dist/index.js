"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const API_KEY = "8187c5241b65440b8e9abab96da2ce45";
app.use((0, cors_1.default)());
app.get("/top-bus-lines", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const linesResponse = yield (0, node_fetch_1.default)(`https://api.sl.se/api2/LineData.json?model=line&key=${API_KEY}`);
        if (!linesResponse.ok) {
            throw new Error('Failed to fetch lines data');
        }
        const linesData = yield linesResponse.json();
        const lines = linesData.ResponseData.Result;
        const stopsResponse = yield (0, node_fetch_1.default)(`https://api.sl.se/api2/LineData.json?model=stop&key=${API_KEY}`);
        if (!stopsResponse.ok) {
            throw new Error('Failed to fetch stops data');
        }
        const stopsData = yield stopsResponse.json();
        const stops = stopsData.ResponseData.Result;
        const lineStops = {};
        stops.forEach((stop) => {
            stop.StopPointNumber.split(',').forEach((lineNumber) => {
                if (!lineStops[lineNumber]) {
                    lineStops[lineNumber] = [];
                }
                lineStops[lineNumber].push(stop.StopPointName);
            });
        });
        const sortedLineNumbers = Object.keys(lineStops).sort((a, b) => lineStops[b].length - lineStops[a].length);
        const top10LineNumbers = sortedLineNumbers.slice(0, 10);
        const top10LinesWithStops = top10LineNumbers.map((lineNumber) => {
            const line = lines.find((line) => line.LineNumber === lineNumber);
            const stops = lineStops[lineNumber];
            return {
                lineNumber: lineNumber,
                // numStops: stops.length,
                stops: stops,
            };
        });
        res.json(top10LinesWithStops);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map