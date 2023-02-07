import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import { resetUser } from '../../actions/user';
import { utils, writeFile } from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from 'react-bootstrap/Modal';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
// import "react-data-table-component-extensions/dist/index.css";
// import DataTableExtensions from "react-data-table-component-extensions";

// import { columns, data } from "./data";


function DashboardUserTable({ userlist, role, openBulkModal, handleShow, dispatch, toastalert, editUser }) {

  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(userlist);
  const [detailModal, setDetailModal] = useState(false);

  useEffect(() => {
    setFilterdata(userlist)
  }, [userlist])

  useEffect(() => {


    if (userlist && userlist.length > 0) {


      const result = userlist.filter((item) => {
        return (item?.Name?.toLowerCase().match(search.toLowerCase()) || item?.Mobile.match(search))
      })


      setFilterdata(result)

    }
  }, [search])

  const handleDetailView = (user_id, role) => {
    setDetailModal(true);
  }

  const columns = [
    {
      name: '#',
      selector: (row,i) => i+1,
      width:"5%"
    },
    {
      name: "Role",
      selector: row => row.role,
      cellExport: row => row.role,
    },
    {
      name: "Name",
      selector: (row) => <span className="cursor-point hover-link" onClick={() => handleDetailView(row._id, row.role)}>{row.Name && row.Name}</span>,
      cellExport: row => row.Name && row.Name,
      sortable: true,
      width:"40%"
    },
    {
      name: "Mobile",
      selector: (row) => row.Mobile,
      cellExport: (row) => row.Mobile,
    },
    {
      name: "Action",
      cellExport: row => row.status,
      cell: (row) => <>

        <button className='button mx-2'
          onClick={() => editUser(row)}
        ><i className='fa fa-edit'></i></button>

        {/* {row.role.toUpperCase() === 'CDPO' &&
          <button className='button mx-2'
            onClick={() => handleReset(row.Mobile)}
          ><i className="fa fa-refresh" aria-hidden="true"></i>
          </button>
        } */}

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
        toastalert('error', 'User is already reseted!')

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
      "Login Status"
    ];
    worksheet1.addRow(headers1)

    let arr = [];
    userlist.forEach((item , i ) => {
      arr = [];
      arr.push(i+1)
      arr.push(item.createdDate.substring(0,10))
      arr.push(item.role)
      arr.push(item.Name)
      arr.push(item.Mobile)
      arr.push(item.status) 
      worksheet1.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Dashboard-Users report.xlsx');
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

    const final_data = userlist.map(elt => [elt.role, elt.Name, elt.Mobile]);

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
                  <img src="/images/icon_Download.svg" alt="Download" width={18}/>
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

              <button className='button title_btn py-0' onClick={handleShow} ><i className='fa fa-plus'></i><span> User</span></button>
            </div>
          </div>
        }
      // subHeaderAlign="left"
      />

      <UserDetailModal modalshow={detailModal} />

    </>


  );
}

export default DashboardUserTable;







function UserDetailModal(props) {

  const [modalShow, setModalShow] = useState(false)

  const handleCloseModal = () => setModalShow(false);
  const handleOpenModal = () => setModalShow(true);

  useState(() => {
    props.modalshow && setModalShow(true)
  })
  return (
    <>



      <Modal
        show={modalShow}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}

      >
        <Modal.Header closeButton>
          <Modal.Title>


          </Modal.Title>
        </Modal.Header>
        <Modal.Body>


        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export { UserDetailModal };