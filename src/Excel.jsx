import React from "react";
import ReactExport from "react-export-excel";
import * as R from 'ramda';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Excel = ({ dataSet }) => {
    return (
        <ExcelFile filename="NumberCounter" element={<button className="btn btn-success">Xuất dữ liệu</button>}>
            <ExcelSheet data={dataSet} name="NumberCounter">
                <ExcelColumn label="Dữ liệu" value={col => R.keys(col)[0]} />
                <ExcelColumn label="Số lần lặp lại" value={col => R.values(col)[0]} />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default React.memo(Excel);