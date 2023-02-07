import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';


function MsTable({ userlist }) {

  const [search, setSearch] = useState("");
  const [filterdata, setFilterdata] = useState(userlist);

  useEffect(() => {
    setFilterdata(userlist)
  }, [userlist])


  useEffect(() => {
    if (userlist && userlist.length > 0) {

      const result = userlist.filter((item) => {
        return item.Name && item.Name.hi && item.Name.hi.toLowerCase().match(search.toLowerCase())
      })
      setFilterdata(result)
    }
  }, [search])

  const columns = [
    {
      name: "Role",
      selector: (row) => row.role && row.role,
    },
    {
      name: "Name",
      selector: (row) => row.Name && row.Name.hi && row.Name.hi
    },
    {
      name: "Mobile",
      selector: (row) => row.Mobile,
      sortable: true,
    },
    {
      name: "district",
      // selector: (row) => row.district_id,
      // sortable: true,
    },
    {
      name: "login",
      selector: (row) => row.district_id,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <>

        <button className='button mx-2'
        // onClick={() => editDistrict(row._id)}
        ><i className='fa fa-edit'></i></button>

      </>
    }
  ]

  return (

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
            type='text'
            placeholder="Search here ..."
            className='w-25 form-control m-0'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ height: '30px' }}
          />

          <div className='d-flex'>
           

            <Dropdown>
              <Dropdown.Toggle variant="light" className='export-icon' id="dropdown-basic2">
                <img src="/images/icon_Download.svg" alt="Download" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="d-flex justify-content-around">
                  {/* <button type="button" onClick={exportexcel} className="doc-download-btn"> */}
                  <img src="/images/xls.png" alt="Download" className="img-fluid cursor-point" width={40} />
                  {/* </button>
                <button type="button" onClick={exportPDF} className="doc-download-btn"> */}
                  <img src="/images/pdf.png" alt="Download" className="img-fluid cursor-point" width={40} />
                  {/* </button> */}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>

        </div>
      }
    />

  );
}

export default MsTable;