import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor(private http: HttpClient) {}

  openExcelWorkbook = async (url: string) => {
    return new Promise<Workbook>(async (resolve, reject) => {
      try {
        const wbo = new Workbook();

        const fileBlob = await firstValueFrom(
          this.http.get(url, { responseType: 'blob' })
        );

        resolve(await wbo.xlsx.load(await fileBlob.arrayBuffer()));
      } catch (error) {
        reject(error);
      }
    });
  };
}
