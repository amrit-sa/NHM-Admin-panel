import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { resetUser, getUserDetails } from '../../actions/user';
import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next'

import moment from 'moment'
import Moment from 'react-moment';
import CdpoDetailsModal from '../models/cdpoDetails-modal';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
// import "react-data-table-component-extensions/dist/index.css";
// import DataTableExtensions from "react-data-table-component-extensions";

// import { columns, data } from "./data";

function CdpoTable({ userlist, awwUserlist, role, openBulkModal, handleShow, dispatch, toastalert, editUser }) {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(userlist);

  const [detailModal, setDetailModal] = useState(false);
  const [CDPODetails, setCDPODetails] = useState([]);
  const [CDPOmappedMS, setCDPOMappedMS] = useState([]);
  const [userModalpayload, setuserModalPayload] = useState({});


  useEffect(() => {
    setFilterdata(userlist)
  }, [userlist])

  useEffect(() => {
    if (userlist && userlist.length > 0) {

      const result = userlist.filter((item) => {
        return (item.Name?.hi?.toLowerCase().match(search.toLowerCase()) || item?.Mobile.match(search))
      })

      setFilterdata(result)
    }
  }, [search])

  const handleDetailView = (user_details) => {

    setuserModalPayload(user_details)

    // dispatch(getUserDetails(payload)).then((response)=>{
    //   if(response && response.code=== 200){
    //     setCDPODetails(response.mappedGeography);
    //     setCDPOMappedMS(response.mappedMs);
    //   }
    // })
    // setDetailModal(true);
  }



  const columns = [
    {
      name: '#',
      selector: (row, i) => row.index,
      sortable: true,
      width: "8%"
    },
    {
      name: t('join_on'),
      cellExport: row => row.createdDate,
      selector: row =>
        <>
          <Moment format="YYYY/MM/DD">{row.createdDate}</Moment>
        </>
    },
    {
      name: t('role'),
      selector: row => row.role,
      cellExport: row => row.role,
      width: "12%"
    },
    {
      name: t('name'),
      selector: (row) => <div className="cursor-point hover-link d-flex flex-column gap-1"
        onClick={() => handleDetailView(row)}
      >
        <span>

          {row.Name?.en && row.Name.en}
        </span>
        <span>
          {row.Name?.gu && row.Name.gu}
        </span>
      </div>,
      cellExport: row => row.Name?.en && row.Name.en,
      sortable: true,
      width: "30%"
    },
    {
      name: t('mobile'),
      selector: (row) => row.Mobile,
      cellExport: (row) => row.Mobile,
    },
    // {
    //   name: "District",
    //   selector: (row) => row.district_name,
    //   cellExport: (row) => row.district_name,
    // },
    {
      name: t('login'),
      cellExport: row => row.OTP_Verified,
      cell: (row) =>
        <>

          <div className='d-flex justify-content-center align-items-center gap-1'>
            {/* <label className="switch mr-3">
                <input type="checkbox"
                  // defaultChecked={row.OTP_Verified && row.OTP_Verified ? true : false } 
                  defaultChecked={true}
                />
                <span className="slider round"></span>
              </label> */}

            {
              (row.OTP_Verified === true)
                ?
                <>
                  <span className="dot bg-success"></span>
                  <span>Active</span>
                </>
                :
                <>
                  <span className="dot bg-danger"></span>
                  <span>Inactive</span>
                </>
            }
          </div>

        </>


    },
    {
      name: t('action'),
      cellExport: row => row.status,
      cell: (row) => <>

        <button className='button mx-2'
          onClick={() => editUser(row)}
        ><i className='fa fa-edit'></i></button>

        {/* <button className='button mx-2'
          onClick={() => handleReset(row.Mobile)}
        ><i className="fa fa-refresh" aria-hidden="true"></i>
        </button> */}

      </>
    }
  ]

  // const data = userlist;

  // const tableData = {
  //   columns,
  //   data
  // };

  const open_BulkModal = () => {
    openBulkModal()
  }


  const handleReset = (mobile_number) => {
    const payload = {
      mobile: mobile_number
    }
    dispatch(resetUser(payload)).then((resp) => {
      if (resp.status === "success") {

        toastalert('success', "User reset successfully")

      } else {
        toastalert('error', 'User is already reset!')

      }
    })
  }




  const exportexcel = () => {

    let workbook = new Workbook();

    let worksheet1 = workbook.addWorksheet(role);


    worksheet1.addRow({})
    let headers1 = [
      "No.",
      "Join On",
      "Role",
      "Name",
      "Mobile",
      // "District",
      "Login Status"
    ];
    worksheet1.addRow(headers1)

    let arr = [];
    userlist.forEach((item, i) => {
      arr = [];
      arr.push(i + 1)
      arr.push(item?.createdDate ? item.createdDate?.substring(0, 10) : item?.Created_Date ? item.Created_Date?.substring(0, 10) : '')
      arr.push(item.role)
      arr.push(item.Name.en + '-'+item.Name.gu)
      arr.push(item.Mobile)
      // arr.push(item.district_name)
      item.OTP_Verified ? arr.push('Active') : arr.push('Inactive')
      worksheet1.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'App-Users report.xlsx');
    })

  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "User Report";
    const headers = [["Role", "Name", "Mobile"]];

    const final_data = userlist.map(elt => [elt.role, elt.Name.en, elt.Mobile]);

    let content = {
      startY: 50,
      head: headers,
      body: final_data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("User-List.pdf")
  }

  return (
    // <DataTableExtensions {...tableData}>

    <>
      <DataTable
        columns={columns}
        data={filterdata}
        noHeader
        pagination
        fixedHeader
        fixedHeaderScrollHeight='420px'
        highlightOnHover
        subHeader

        subHeaderComponent={
          <div className='w-100 d-flex justify-content-between'>

            <input
              type='text'
              placeholder="Search here ..."
              className='w-25 form-control m-0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: '30px' }}
            />
            <div className='d-flex gap-2'>

              {
                role === 'CDPO' &&
                <Dropdown>
                  <Dropdown.Toggle variant="light" className='export-icon py-0' id="dropdown-basic1">
                    <img src="/images/upload_icon.png" alt="upload" width={23} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={open_BulkModal}>
                      Bulk Upload CDPO List
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              }

              <Dropdown>
                <Dropdown.Toggle variant="light" className='export-icon py-0' id="dropdown-basic2">
                  <img src="/images/icon_Download.svg" alt="Download" width={18} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="d-flex justify-content-around">
                    <button type="button" onClick={exportexcel} className="doc-download-btn">
                      <img src="/images/xls.png" alt="Download" className="img-fluid cursor-point" width={40} />
                    </button>
                    <button type="button" onClick={exportPDF} className="doc-download-btn">
                      <img src="/images/pdf.png" alt="Download" className="img-fluid cursor-point" width={40} />
                    </button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>


              {
                role !== 'ALL' &&
                <button className='button title_btn py-0' onClick={handleShow} ><i className='fa fa-plus'></i><span> {role}</span></button>
              }
            </div>
          </div>
        }
      // subHeaderAlign="left"
      />
      <CdpoDetailsModal
        userModalpayload={userModalpayload}
        // modalshow={detailModal}
        // handleClose={handleDetailClose}
        // CDPOmappedMS={CDPOmappedMS}
        // CDPODetails={CDPODetails}
        dispatch={dispatch}
      />

    </>


  );
}

export default CdpoTable;


