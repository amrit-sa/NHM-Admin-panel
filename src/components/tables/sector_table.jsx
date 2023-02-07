import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
// import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';
import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from 'react-bootstrap/Dropdown';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { useTranslation } from 'react-i18next'

function SectorTable({ data, editSector , handleShow}) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(data);
  // const [deletingItem , setDeletingItem] = useState(null);
  // const [deleteshow , setDeleteShow] = useState(false);

  useEffect(() => {
    setFilterdata(data)
  }, [data])

  useEffect(() => {
    const nameResult = data.filter((item) => {
      return item?.sector_name?.en?.toLowerCase().match(search.toLowerCase())
    })

    // const codeResult = data.filter((item) => {
    //   return item?.sector_code?.match(search.toLowerCase())
    // })
    // setFilterdata([...nameResult, ...codeResult])

    setFilterdata(nameResult)
  }, [search])

  const columns = [
    {
      name: '#',
      selector: (row, i) => i + 1,
      width: "8%"
    },
    // {
    //   name: "Sector Code",
    //   selector: (row) => row.sector_code
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

      sortable: true,
    },
    {
      name: t("ghatak"),
      selector: (row) =>
        <div className="cursor-point d-flex gap-1" >
          <span>

            {row.mapped_ghatak?.en && row.mapped_ghatak.en}
          </span>
          <span>{' ('}
            {row.mapped_ghatak?.gu && row.mapped_ghatak.gu}
            {')'}
          </span>
        </div>,

      sortable: true,
    },
    {
      name: t("sector"),
      selector: (row) =>
        <div className="cursor-point d-flex gap-1" >
          <span>

            {row.sector_name?.en && row.sector_name.en}
          </span>
          <span>{' ('}
            {row.sector_name?.gu && row.sector_name.gu}
            {')'}
          </span>
        </div>,

      // sortable: true,
    },
    {
      name: t("action"),
      cell: (row) => <>

        <button className='button mx-2'
          onClick={() => editSector(row.id)}
        ><i className='fa fa-edit'></i></button>
        {/* <button className='button mx-2'
          onClick={() => {
            setDeleteShow(true)
            setDeletingItem(row._id)
          }
          }
        ><i className='text-danger fa fa-trash'></i></button> */}
      </>,
      width: "8%"
    }
  ]


  // const handleDeleteClose=()=>{
  //   setDeleteShow(false)
  //   setDeletingItem(null)
  // }

  const exportexcel = () => {

    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('Sectors');


    worksheet.addRow({})
    let headers = [
      "No.",
      "District",
      "Ghatak",
      "Sector",
    ];
    worksheet.addRow(headers)


    let arr = [];
    data.forEach((item, i) => {
      arr = [];
      arr.push(i + 1)
      arr.push(item?.mapped_district?.en + " - " + item?.mapped_district?.gu)
      arr.push(item?.mapped_ghatak?.en + " - " + item?.mapped_ghatak?.gu)
      arr.push(item?.sector_name?.en + " - " + item?.sector_name?.gu)
      worksheet.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Sector Report.xlsx');
    })

  }


  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Sector Report";
    const headers = [["Code","District","Ghatak", "Sectors"]];

    const final_data = data.map((elt,i) => [i+1,elt?.mapped_district?.en , elt?.mapped_ghatak?.en , elt.sector_name?.en]);

    let content = {
      startY: 50,
      head: headers,
      body: final_data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Sectors.pdf")
  }


  return (

    <>
      <DataTable
        // title={"Sectors"}
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

              <button className='button title_btn py-0' onClick={handleShow}><i className='fa fa-plus'></i> Add Sector</button>
            </div>

          </div>
        }
      />


      {/* <Modal
        show={deleteshow}
        onHide={handleDeleteClose}
        backdrop="static"
        keyboard={false}

      >

        <Modal.Body>
          <h5>Do you really want to delete it ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => {
            deleteSector(deletingItem);
            handleDeleteClose()
          }}>Yes</Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default SectorTable;