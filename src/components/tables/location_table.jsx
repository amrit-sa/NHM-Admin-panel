import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
// import Table from 'react-bootstrap/Table';
// import { utils, writeFile } from 'xlsx';
// import jsPDF from "jspdf";
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Workbook } from 'exceljs';
// import * as fs from 'file-saver';
// import "jspdf-autotable";
import { useTranslation } from 'react-i18next'

function LocationTable({ data, editGhatak ,handleShow , locationAvailable}) {
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
    {
      name: t("district"),
      omit : !locationAvailable?.District ,
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
      name: 'Block',
      omit : !locationAvailable?.Block,
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
        name: 'PHC/UHC',
        omit : !locationAvailable?.PHC,
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
        name: 'SC/Ward',
        omit : !locationAvailable?.Ward,
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
        name: 'Village',
        omit : !locationAvailable?.Village,
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
        name: 'Area',
        omit : !locationAvailable?.Area,
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

            {/* <div className='d-flex'>
              <button className='button title_btn py-0' onClick={handleShow}><i className='fa fa-plus'></i><span> Add Ghatak</span></button>

            </div> */}

          </div>
        }
      />


    </>
  );
}

export default LocationTable;