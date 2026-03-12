import { createServer } from "./src/app.js";
import dotenv from "dotenv";

import http from "http";

dotenv.config();

function main() {
    try {
        const PORT = process.env.PORT || 5000;
        const server = http.createServer(createServer());

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        throw error;
    }
}

main();