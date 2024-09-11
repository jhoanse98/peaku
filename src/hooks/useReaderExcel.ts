import React from 'react'
import { arrayBuffer } from 'stream/consumers';
import {read, utils, SSF} from 'xlsx'

const useReaderExcel = () => {

    const convertExcelDate = (dateValue: number) => {
        if (typeof dateValue === 'number' && !isNaN(dateValue)) {
            const date = SSF.parse_date_code(dateValue);
            return new Date(date.y, date.m - 1, date.d).toISOString().split('T')[0];
        }
        return dateValue;
    };

    const fetchDataExcel = async () => {
        try {
            const response = await fetch('/data/EPSA_Listado_Costos.xlsx');
            return await response.arrayBuffer();
        }
        catch (e: any) {
            console.log(e.message)
        }
        return new ArrayBuffer(8);
    }

    

    const getDataFromExcel = async (arrayBuffer:  ArrayBuffer) => {
        try {
            const workbook = read(arrayBuffer, { type: 'array' });
              const worksheet = workbook.Sheets[workbook.SheetNames[2]];
              const jsonData = utils.sheet_to_json(worksheet, { header: 2 });
              const dataExcel = jsonData.map((element: any) => {
                  return {
                      line: element.Linea,
                      date: convertExcelDate(element.Fecha),
                      residential: element['Residencial [%]']*100,
                      comercial: element['Comercial [%]']*100,
                      industrial: element['Industrial [%]']*100
                  }
              })
              return dataExcel.slice(0,20)
            
        } catch (e: any) {
            console.log(e.message)
        }
        return []
        
    } 

    return {fetchDataExcel, getDataFromExcel}
  
}

export default useReaderExcel
