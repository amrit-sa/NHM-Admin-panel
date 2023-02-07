import DataTable from 'react-data-table-component';
import { getSubVisitData } from '../../actions/survey';
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTranslation } from 'react-i18next'

function VisitTable({ title, setShowSubVisit, dispatch, data, deleteVisit, editVisit, handleShow, visitCategories, selected_visit, toastalert }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      width: '15%'
    },
    // {
    //   name: "Image",
    //   selector: row => <img src={process.env.REACT_APP_FILE_BASE_URL + row.path} alt="visit-image" width={100} height={100} />,
    // },
    {
      name: t("visits"),
      selector: row =>
        <div className="d-flex flex-column gap-1"

        >
          <span>

            {row.category_title?.en && row.category_title.en}
            {' - '}
            {row.category_title?.gu && row.category_title.gu}
            {''}
          </span>
        </div>

      ,
      sortable: true,
    },
    {
      name: t("role"),
      selector: (row) => row.role,
    },
    {
      name: t("action"),
      cellExport: row => row.status,
      width: '15%',
      cell: (row, index) => <>

        {/* <button className='button mx-2'
          onClick={() => editUser(row)}
        ><i className='fa fa-edit'></i></button>

        <button className='button mx-2'
          onClick={() => handleReset(row.Mobile)}
        ><i className="fa fa-refresh" aria-hidden="true"></i>
        </button> */}


        <div className='d-flex justify-content-center'>

          <button
            className='button button-icon mx-2'
            onClick={() => editVisit(row)}
          >
            <i className='fa fa-edit'></i>
          </button>

          {/* <button className='button button-icon mx-2' onClick={() => deleteVisit(row._id)}><i className='text-danger fa fa-trash'></i></button> */}

          {/* <Link className='button button-icon mx-2' to={`/checklists/${index + 1}`}><i className=' fa fa-eye'></i></Link> */}
          <button className='button button-icon mx-2' onClick={() => handleViewVisit(row)}><i className=' fa fa-eye'></i></button>

        </div>
      </>
    }
  ]

  const handleViewVisit = (visit) => {
    // CALL API TO GET SUB CATEGORY USING VISIT-ID
    dispatch(getSubVisitData(visit)).then((response) => {
      if (response.status === 'success') {
        setShowSubVisit(true)
        navigate('/visits/cat')
      }
    })
  }

  const exportexcel = () => {

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Visits');


    worksheet.addRow({})
    let headers = [
      "No.",
      "Visit Name",
      "Role"
    ];
    worksheet.addRow(headers)


    let arr = [];
    data.forEach((item, i) => {
      arr = [];
      arr.push(i + 1)
      arr.push(item?.category_title?.en + " - "+ item?.category_title?.gu)
      arr.push(item?.role)
      worksheet.addRow(arr)
    })


    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Visits Report.xlsx');
    })

  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const format = "letter";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size, format);

    doc.setFontSize(15);

    const title = "Visits Report";
    const headers = [["No.", "Image path", "Created On", "Name", "Role"]];

    const final_data = data.map(elt => [elt._id,
    elt.path
      , elt.createdDate.substring(0, 10), elt.category_title.hi, elt.role]);

    let content = {
      startY: 50,
      head: headers,
      body: final_data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Visits.pdf")
  }


  return (
    <>

      <header>
        <div className='d-flex justify-content-between '>
          <span className='fs-5 px-2 font-primary'>{title}</span>
          {/* <button className='button title_btn py-0' onClick={this.handleShow}><i className='fa fa-plus'></i><span> Add District</span></button> */}
        </div>
      </header>

      <div className='py-0 sub-wrapper'>

        <header>
          <div className='d-flex justify-content-end '>
            {/* <span className='heading'>{title}</span> */}



            <Dropdown>
              <Dropdown.Toggle variant="light" className='export-icon py-0' id="dropdown-basic2">
                <img src="/images/icon_Download.svg" alt="Download" width={18} />
              </Dropdown.Toggle>


              <Dropdown.Menu>
                <div className="d-flex justify-content-around">
                  <button type="button" onClick={exportexcel} className="doc-download-btn">
                    <img src="images/xls.png" alt="Download" className="img-fluid" />
                  </button>
                  {/* <button type="button" onClick={exportPDF} className="doc-download-btn">
                      <img src="images/pdf.png" alt="Download" className="img-fluid" />
                    </button> */}
                </div>
              </Dropdown.Menu>
            </Dropdown>

            <button className='button title_btn py-0' onClick={handleShow}><i className='fa fa-plus'></i><span> Add Visit</span></button>

          </div>

        </header>


        <DataTable
          columns={columns}
          data={data}
          noHeader
          pagination
          fixedHeader
          fixedHeaderScrollHeight='400px'
          highlightOnHover
        />
      </div>


    </>

  );
}

function mapStateToProps(state) {
  const { visits, visitCategories, selected_visit, selected_visit_category } = state.survey;

  return {
    visits,
    visitCategories,
    selected_visit,
    selected_visit_category
  };
}
export default connect(mapStateToProps, null)(VisitTable);






