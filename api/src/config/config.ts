import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export const config = {
  port: process.env.PORT || 4000,
};

export default prisma;
