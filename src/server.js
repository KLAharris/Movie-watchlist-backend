import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';

const port = process.env.PORT || 5001;
let server;

connectDB().then(() => {
    server = app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("SIGINT", async () => {
    console.log("SIGINT received, shutting down gracefully...");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});
