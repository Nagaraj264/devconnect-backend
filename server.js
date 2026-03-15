import { createServer } from "./src/app.js";
import dotenv from "dotenv";
import { initSocket } from "./src/sockets/socket.js";

import http from "http";

dotenv.config();

function main() {
    try {
        const PORT = process.env.PORT || 5000;
        const app = createServer();
        const server = http.createServer(app);

        initSocket(server);

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        throw error;
    }
}

main();