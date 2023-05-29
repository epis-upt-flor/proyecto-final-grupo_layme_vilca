import { createServer, IncomingMessage, ServerResponse } from "http";
import { NextApiHandler } from "next";
import { __ApiPreviewProps } from "next/dist/server/api-utils";
// import { apiResolver } from "next/dist/server/api-utils";
import { apiResolver } from "next/dist/server/api-utils/node"
// next/dist/server/api-utils/node
import request from "supertest";

export function testClient(handler : NextApiHandler) {
  const serverRequestListener = async (req : IncomingMessage, res : ServerResponse) => {
    return apiResolver(req, res, undefined, handler, {} as __ApiPreviewProps, false);
  };

  
  const server = createServer(serverRequestListener);

  return request(server);
}