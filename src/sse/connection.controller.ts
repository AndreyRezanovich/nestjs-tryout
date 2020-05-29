// import { Controller, Get, Res } from '@nestjs/common';
// import { ConnectionService } from './connection.service';
// import { Response } from 'nestjs-sse';
// import  {EventEmitter} from 'events';
//
//
// @Controller()
// export class ConnectionController {
//   emitter = new EventEmitter();
//
//   constructor(
//     private readonly connectionService: ConnectionService,
//   ) {
//
//   }
//   //
//   // @Get('/todos')
//   // connect(@Res() res: Response) {
//   //   console.log('Connecting');
//   //   res.sse(`data: ${JSON.stringify({ text: 'init' })}\n\n`);
//   //   this.emitter.on('test', (data) => {
//   //     res.sse(`data: ${JSON.stringify(data)}\n\n`);
//   //   });
//   // }
// }
