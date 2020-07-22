import { Injectable } from '@nestjs/common';
import { json2csv } from 'json-2-csv';
import * as fs from 'fs';

const parser = require('simple-excel-to-json');
const FileAPI = require('file-api'), File = FileAPI.File;


@Injectable()
export class ParserService {
  constructor() {
  }

  async parseCsv(file) {
    try {
      return parser.parseXls2Json(file.buffer);
    } catch (e) {
      throw new TypeError('Incorrectly filled table');
    }
  }

  parseJson(json, cb) {
    json2csv(json, (err, csv) => {
      if (err) {
        throw err;
      }
      const file = new File({
        name: 'test.csv',
        type: 'text/csv',
        buffer: Buffer.from(csv),
      });
      fs.writeFile('file.csv', csv, (err) => {
          if (err) {
            return console.log(err);
          }
        },
      );
      return cb(file);
    });
  }
}
