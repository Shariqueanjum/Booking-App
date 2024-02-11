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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./db/connect"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.get("/", (req, res) => {
    res.send("hello");
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MONGODB_URL === undefined)
            throw new Error();
        (0, connect_1.default)(process.env.MONGODB_URL);
        app.listen(port, () => console.log(`Server started on port ${port}`));
    }
    catch (error) {
        console.log(error, "welcome");
    }
});
startServer();
