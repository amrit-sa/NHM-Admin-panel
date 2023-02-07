import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
// import Table from 'react-bootstrap/Table';
import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from 'react-bootstrap/Dropdown';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { useTranslation } from 'react-i18next'

function GhatakTable({ data, editGhatak ,handleShow , locationAvailable}) {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(data);


  useEffect(() => {
    setFilterdata(data)
  }, [data])

  useEffect(() => {

    const nameResult = data.filter((item) => {
      return item?.ghatak_name?.en?.toLowerCase().match(search.toLowerCase())
    })

    const coderesult = data.filter((item) => {
      return item?.mapped_district?.en && item.mapped_district.en.match(search)
    })

    setFilterdata([...nameResult, ...coderesult])
  }, [search])

  const columns = [
    {
      name: '#',
      selector: (row, i) => i + 1
    },
    // {
    //   name: "Code",
    //   selector: (row) => row.project_code
    // },

    {
      name: t("district"),
      selector: (row) =>
        <div className="cursor-point d-flex gap-1" >
          <span>

            {row.mapped_district?.en && row.mapped_district.en}
          </span>
          <span>{' ('}
            {row.mapped_district?.gu && row.mapped_district.gu}
            {')'}
          </span>
        </div>,
      //   sortable: true,
    },
    {
      name: t("ghatak"),
      omit : locationAvailable?.Block,
      selector: (row) =>
        <div className="cursor-point d-flex gap-1" >
          <span>

            {row.ghatak_name?.en && row.ghatak_name.en}
          </span>
          <span>{' ('}
            {row.ghatak_name?.gu && row.ghatak_name.gu}
            {')'}
          </span>
        </div>,
      //   sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => <>

        <button className='button mx-2'
          onClick={() => editGhatak(row.id)}
        ><i className='fa fa-edit'></i></button>

      </>
    }
  ]

  const exportexcel = () => {

    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Projects');


    worksheet.addRow({})
    let headers = [
      "No.",
      "District",
      "Ghatak",
    ];
    worksheet.addRow(headers)


    let arr = [];
    data.forEach((item, i) => {
      arr = [];
      arr.push(i + 1)
      arr.push(item?.mapped_district?.en + " - " + item?.mapped_district?.gu)
      arr.push(item.ghatak_name.en + '-' + item.ghatak_name.gu)
      worksheet.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Ghatak Report.xlsx');
    })

  }


  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Projects Report";
    const headers = [["Code","District","Ghatak"]];

    const final_data = data.map((elt,i) => [i+1, elt?.mapped_district?.en, elt.ghatak_name.en]);

    let content = {
      startY: 50,
      head: headers,
      body: final_data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Ghatak.pdf")
  }



  return (

    <>
      <DataTable
        // title={"Projects"}
        columns={columns}
        data={filterdata}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='400px'
        highlightOnHover
        subHeader
        subHeaderComponent={
          <div className='w-100 d-flex justify-content-between'>
            <input
              type='text'
              placeholder="Search here"
              className='w-25 form-control m-0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: '30px' }}
            />

            <div className='d-flex'>


              <Dropdown>
                <Dropdown.Toggle variant="light" className='export-icon py-0' id="dropdown-basic2">
                  <img src="/images/icon_Download.svg" alt="Download" width={18} />
                </Dropdown.Toggle>


                <Dropdown.Menu>
                  <div className="d-flex justify-content-around">
                    <button type="button" onClick={exportexcel} className="doc-download-btn">
                      <img src="images/xls.png" alt="Download" className="img-fluid" />
                    </button>
                    <button type="button" onClick={exportPDF} className="doc-download-btn">
                      <img src="images/pdf.png" alt="Download" className="img-fluid" />
                    </button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <button className='button title_btn py-0' onClick={handleShow}><i className='fa fa-plus'></i><span> Add Ghatak</span></button>

            </div>

          </div>
        }
      />


    </>
  );
}

export default GhatakTable;