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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const API_KEY = '5da196d47f8f4e5facdb68d2e25b9eae';
app.get('/top-bus-lines', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(`https://api.sl.se/api2/LineData.json?model=stop&key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = yield response.json();
        console.log(data.ResponseData);
        if (!data || !data.ResponseData || !data.ResponseData.Result) {
            throw new Error('Invalid API response');
        }
        const busStops = data.ResponseData.Result.map((busStop) => ({
            id: busStop.StopPointNumber,
            name: busStop.StopPointName,
        }));
        res.json(busStops);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map