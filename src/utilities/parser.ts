import { Injectable } from '@nestjs/common';
import neatCsv = require('neat-csv');

const parser = require('simple-excel-to-json');


@Injectable()
export class ParserService {
  constructor() {
  }

  async parse(file) {
    return parser.parseXls2Json(file.buffer);
    // const csv = file.buffer;
    // console.log(await neatCsv(csv));
  }
}
