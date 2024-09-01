"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var web_push_1 = __importDefault(require("web-push"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
var uri = process.env.MONGODB_KEY || "";
var PORT = 5050;
if (uri) {
    mongoose_1.default
        .connect(uri)
        .then(function () {
        console.log("MongoDB connected");
    })
        .catch(function (err) {
        console.log(err);
    });
}
else {
    console.log("No URI to DB");
}
web_push_1.default.setVapidDetails("mailto:adrienlegeleu@gmail.com", process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);
var app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "group-authorization , user-authorization",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
}));
app.use("", routes_1.default);
app.listen(PORT, function () {
    console.log("Server connected on port ".concat(PORT, " => url: http://localhost:").concat(PORT));
});
//# sourceMappingURL=server.js.map