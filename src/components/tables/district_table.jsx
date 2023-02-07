import React, { useState, useEffect, Fragment } from 'react';
import DataTable from 'react-data-table-component';
// import Table from 'react-bootstrap/Table';
import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from 'react-bootstrap/Dropdown';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { useTranslation } from 'react-i18next'

const DistrictTable = ({ data, deleteDistrict, editDistrict }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(data);

  useEffect(() => {
    setFilterdata(data)
  }, [data])

  useEffect(() => {
    const result = data.filter((item) => {
      return item?.district?.en?.toLowerCase().match(search.toLowerCase())
    })
    setFilterdata(result)
  }, [search])

  const columns = [
    // {
    //   name: "Code",
    //   selector: (row) => row._id
    // },
    {
      name: '#',
      selector: (row, i) => i + 1
    },
    {
      name: t('district'),
      selector: (row) =>
        <div className="cursor-point d-flex gap-1" >
          <span>

            {row.district?.en && row.district.en}
          </span>
          <span>{' ('}
            {row.district?.gu && row.district.gu}
            {')'}
          </span>
        </div>,

    sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => <>

        <button className='button mx-2'
          onClick={() => editDistrict(row._id)}
        ><i className='fa fa-edit'></i></button>

      </>
    }
  ]

  const exportexcel = () => {

    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Districts');


    worksheet.addRow({})
    let headers = [
      "No.",
      "District Name",
    ];
    worksheet.addRow(headers)


    let arr = [];
    data.forEach((item, i) => {
      arr = [];
      arr.push(i + 1)
      arr.push(item?.district?.en +" - "+ item?.district?.gu )
      worksheet.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'District Report.xlsx');
    })

  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Districts Report";
    const headers = [["Code", "District Name"]];

    const final_data = data.map((elt,i) => [i+1, elt?.district?.en]);


    let content = {
      startY: 50,
      head: headers,
      body: final_data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Districts.pdf")
  }


  return (

    // <Table responsive bordered >
    //   <thead>
    //     <tr>
    //       <th>#</th>
    //       <th>Code</th>
    //       <th>Name</th>
    //       <th>Action</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data.length > 0 && data.map((obj, index) =>
    //        <tr key={index}>
    //        <td>{index+1}</td>
    //        <td>{obj._id}</td>
    //        <td>{obj.district}</td>
    //        <td>
    //          <button className='button mx-2'
    //             onClick={()=>editDistrict(obj._id)}
    //             ><i className='fa fa-edit'></i></button>
    //          <button className='button mx-2' onClick={()=>deleteDistrict(obj._id)}><i className='p-danger fa fa-trash'></i></button>
    //        </td>
    //      </tr>
    //     )}

    //   </tbody>
    // </Table>
    <>



      <DataTable
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
              type='p'
              placeholder="Search here...."
              className='w-25 form-control m-0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: '30px' }}
            />
            {/* <button className="button" onClick={exportexcel}>Export</button>
            <button className="button" onClick={exportPDF}>PDF</button> */}

            {/* <div className="dropdown">
              <button className="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="nav_icons nav_download">
                  <img src="images/icon_Download.svg" alt="Download" />
                </span>
              </button>
              <div className="dropdown-menu shadow" aria-labelledby="dropdownMenuButton">
                <div className="d-flex">
                  <button type="button" onClick={exportexcel} className="doc-dowlload-btn">
                    <img src="images/xls.png" alt="Download" className="img-fluid" />
                  </button>
                  <button type="button" onClick={exportPDF} className="doc-dowlload-btn">
                    <img src="images/pdf.png" alt="Download" className="img-fluid" />
                  </button>
                </div>
              </div>
            </div> */}


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



          </div>
        }
      />



    </>
  );
}

export default DistrictTable;