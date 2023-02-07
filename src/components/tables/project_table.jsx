import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
// import Table from 'react-bootstrap/Table';
import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from 'react-bootstrap/Dropdown';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

function ProjectTable({ data, editProject }) {

  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(data);


  useEffect(() => {
    setFilterdata(data)
  }, [data])

  useEffect(() => {

    const nameResult = data.filter((item) => {
      return item?.project_name?.toLowerCase().match(search.toLowerCase())
    })

    const coderesult = data.filter((item) => {
      return item?.project_code && item.project_code.match(search)
    })

    setFilterdata([...nameResult, ...coderesult])
  }, [search])

  const columns = [
    {
      name: '#',
      selector: (row,i) => i+1
    },
    {
      name: "Code",
      selector: (row) => row.project_code
    },
    {
      name: "Name",
      selector: (row) => row.project_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <>

        <button className='button mx-2'
          onClick={() => editProject(row._id)}
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
      "Project Name",
    ];
    worksheet.addRow(headers)


    let arr = [];
    data.forEach((item , i ) => {
      arr = [];
      arr.push(i+1)
      arr.push(item.project_name)
      worksheet.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Project Report.xlsx');
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
    const headers = [["Code", "Project Name"]];

    const final_data = data.map(elt => [elt._id, elt.project_name]);

    let content = {
      startY: 50,
      head: headers,
      body: final_data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Projects.pdf")
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
            <Dropdown>
            <Dropdown.Toggle variant="light" className='export-icon py-0' id="dropdown-basic2">
                  <img src="/images/icon_Download.svg" alt="Download" width={18}/>
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
          </div>
        }
      />


    </>
  );
}

export default ProjectTable;