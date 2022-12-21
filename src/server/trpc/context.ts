import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "@utils/server.util";
import type { NextApiRequest } from "next";

import { prisma } from "../db/client";

// /**
//  * Replace this with an object if you want to pass things to createContextInner
//  */
// type CreateContextOptions = Record<string, null>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async () => {
  return {
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {

  const session = await getSession(opts, prisma) as string | null;
  const req = opts.req as NextApiRequest;

  return {
    session,
    req,
    prisma
  };

};

export type Context = inferAsyncReturnType<typeof createContext>;
