// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response } from 'express';
//
// @Injectable()
// export class SSEMiddleware implements NestMiddleware {
//   use(req: Request, res: Response | any, next: () => void) {
//     // console.log(res);
//     req.socket.setKeepAlive(true);
//     req.socket.setTimeout(0);
//     const gotHeaders = Object.keys(res.getHeaders());
//     console.log(gotHeaders);
//     if (!gotHeaders.includes('Connection')) {
//       res.setHeader('Content-Type', 'text/event-stream');
//       res.setHeader('Cache-Control', 'no-cache');
//       res.setHeader('Connection', 'keep-alive');
//     }
//     res.status(200);
//
//     // export a function to send server-side-events
//     res.sse = function sse(data) {
//       res.write(data);
//
//       // support running within the compression middleware
//       // @ts-ignore
//       if (res.flushHeaders() && data.match(/\n\n$/)) {
//         res.flushHeaders();
//       }
//     };
//
//     // write 2kB of padding (for IE) and a reconnection timeout
//     // then use res.sse to send to the client
//     res.write(':' + Array(2049).join(' ') + '\n');
//     res.sse('retry: 2000\n\n');
//
//     // keep the connection open by sending a comment
//     const keepAlive = setInterval(() => {
//       res.sse(':keep-alive\n\n');
//     }, 20000);
//
//     // cleanup on close
//     res.on('close', function close() {
//       clearInterval(keepAlive);
//     });
//
//     next();
//   }
// }
