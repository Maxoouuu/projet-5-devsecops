// csvService.ts
import Papa, { ParseResult } from 'papaparse';

export const parseCSV = (file: File, callback: (data: any[]) => void) => {
  Papa.parse(file, {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (result: ParseResult<any>) => {
      callback(result.data);
    },
  });
};
