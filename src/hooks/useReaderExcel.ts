import React, { useState } from 'react'
import {read, utils, SSF} from 'xlsx'
import { Energy } from '../utils/models/Energy.models'

const useReaderExcel = () => {
    const [data, setData] = useState<Energy[]>([])

    const convertExcelDate = (dateValue: number) => {
        if (typeof dateValue === 'number' && !isNaN(dateValue)) {
            const date = SSF.parse_date_code(dateValue);
            return new Date(date.y, date.m - 1, date.d).toISOString().split('T')[0];
        }
        return dateValue;
  };

    const getDataFromExcel = async () => {
      const response = await fetch('/data/EPSA_Listado_Costos.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = read(arrayBuffer, { type: 'array' });

        const worksheet = workbook.Sheets[workbook.SheetNames[2]];
        const jsonData = utils.sheet_to_json(worksheet, { header: 2 });
        const dataMockup = jsonData.map((element: any) => {
            return {
                line: element.Linea,
                date: convertExcelDate(element.Fecha),
                residential: element['Residencial [%]']*100,
                comercial: element['Comercial [%]']*100,
                industrial: element['Industrial [%]']*100
            }
        })
        return dataMockup.slice(0,60)
    } 

    return {getDataFromExcel}
  
}

export default useReaderExcel
