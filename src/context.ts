import { PrismaClient } from "@prisma/client";
import type { ExpressContext } from "apollo-server-express";
import { OAuth2Client } from "google-auth-library";

export type Context = {
  prisma: PrismaClient;
};

const prisma = new PrismaClient();
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL,
);
export const context = async (ctx: ExpressContext) => {
  oAuth2Client.getTokenInfo(ctx.req.headers.authorization ?? "");
  return {
    prisma: prisma,
  };
};
