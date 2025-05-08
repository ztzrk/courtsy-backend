import app from "./app";
import prisma from "./utils/prisma.client";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
