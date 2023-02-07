import React from 'react'
import { useState } from 'react'
import { getSectors } from '../../actions/area'
import { getGhataks } from '../../actions/projects'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const FilterModalComponent = (props) => {

    const [filterData, setFilterData] = useState({
        district: '',
        ghatak: '',
        sector: ''
    })
    const [filteredLocation, setFilterdLocation] = useState({
        ghatakList: [],
        sectorList: []
    })




    const setFilter_Data = (filtertype, value) => {

        setFilterData({ ...filterData, [filtertype]: value })
        if (filtertype === 'district') {

            if (value.length === 0) {
                // user pressed all districts (no district selected)
                // so reset filtered ghatak and sector data from state
                setFilterdLocation({ ...filteredLocation, ghatakList: [], sectorList: [] })
            }


            const distName = value.split('/')[1].toUpperCase();
            if (props.allghataks?.length === 0) {
                // load all ghatak
                props.dispatch(getGhataks()).then((resp) => {
                    let filteredGhatakList = resp.response.filter((ghtk) => ghtk?.mapped_district?.en.toUpperCase() == distName)
                    setFilterdLocation({ ...filteredLocation, ghatakList: filteredGhatakList })
                })
            } else {
                let filteredGhatakList = props.allghataks.filter((ghtk) => ghtk?.mapped_district?.en.toUpperCase() == distName)
                setFilterdLocation({ ...filteredLocation, ghatakList: filteredGhatakList })
            }
        }


        if (filtertype === 'ghatak') {

            if (value.length === 0) {
                // user pressed all ghataks (no ghatak selected)
                // so reset filtered sector data from state
                setFilterdLocation({ ...filteredLocation, sectorList: [] })
            }

            const ghatakName = value;
            if (props.allSectors?.length === 0) {
                // load all sectors
                props.dispatch(getSectors()).then((resp) => {

                    let filteredSectorList = resp.response.filter((sec) => sec?.mapped_ghatak?.en.toUpperCase() == ghatakName.toUpperCase())
                    setFilterdLocation({ ...filteredLocation, sectorList: filteredSectorList })
                })
            } else {
                let filteredSectorList = props.allSectors.filter((sec) => sec?.mapped_ghatak?.en.toUpperCase() == ghatakName.toUpperCase())
                setFilterdLocation({ ...filteredLocation, sectorList: filteredSectorList })
            }

        }
    }





    const handleFilterSubmit = (e) => {
        e.preventDefault()
        // GET THE ROLE 
        // IF ROLE=DPO  =>   FILTER DATA AS PER SELECTED DISTRICT ID 
        // IF ROLE=CDPO/MS/AWW  =>   FILTER DATA AS PER SELECTED DISTRICT / GHATAK / SECTOR ID WHATEVER IS AVAILABLE 

        if (props.userType == 'DPO') {
            let tempList = props.allUsers;
            let distFilterList = [];
            let ghtkFilterList = [];
            let secFilterList = [];

            if (filterData?.district?.length > 0) {
                const distId = filterData.district.split('/')[0];
                distFilterList = tempList.filter((data) => data.district_id == distId)
            } else {
                distFilterList = tempList;
            }
            if (filterData?.ghatak?.length > 0) {
                ghtkFilterList = distFilterList.filter((data) => data?.Block?.en == filterData.ghatak)
            } else {
                ghtkFilterList = distFilterList;
            }

            if (filterData?.sector?.length > 0) {
                secFilterList = ghtkFilterList.filter((data) => data?.Sector?.en == filterData.sector)
            } else {
                secFilterList = ghtkFilterList;
            }

            props.setUserList(secFilterList)

        } else {
            let tempList = props.appWorkerlist.filter(obj => obj.role.toUpperCase()===props.userType.toUpperCase());
            let distFilterList = [];
            let ghtkFilterList = [];
            let secFilterList = [];

            if (filterData?.district?.length > 0) {

                const distName = filterData.district.split('/')[1];
                distFilterList = tempList.filter((data) => data?.District?.en.toUpperCase() == distName.toUpperCase())
            } else {
                distFilterList = tempList;
            }


            if (filterData?.ghatak?.length > 0) {
                ghtkFilterList = distFilterList.filter((data) => data?.Block?.en == filterData.ghatak)
            } else {
                ghtkFilterList = distFilterList;
            }

            if (filterData?.sector?.length > 0) {
                secFilterList = ghtkFilterList.filter((data) => data?.Sector?.en == filterData.sector)
            } else {
                secFilterList = ghtkFilterList;
            }

            props.setUserList(secFilterList)
        }

        props.handleFilterModalClose()

    }


    const handleClearFilter=(e)=>{

        setFilterData({
            district: '',
            ghatak: '',
            sector: '',
        });

        setFilterdLocation({
            ghatakList: [],
            sectorList: []
        })

        if (props.userType == 'DPO') {
            props.setUserList(props.allUsers)

        }else{
            props.setUserList(props.appWorkerlist)

        }
        props.handleFilterModalClose()
    }

    return (
        <Modal  // FILTER MODAL
            show={props.filterModal}
            onHide={props.handleFilterModalClose}
            backdrop="static"
            keyboard={false}
            className='right-modal '

        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Filter user data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form
                    onSubmit={handleFilterSubmit}
                >


                    <Form.Group className="my-4" >
                        <Form.Label>District</Form.Label>
                        <Form.Select className="custom-select"
                            value={filterData?.district}
                            onChange={(e) => setFilter_Data('district', e.target.value)}
                        >
                            <option value=''>All Districts</option>
                            {props.allDistricts?.length > 0 && props?.allDistricts.map((dis, i) => {
                                // return <option key={i} value={dis?._id}>{dis?.district?.en + '-' + dis?.district?.gu}</option>
                                return <option key={i} value={dis?._id + '/' + dis?.district?.en}>{dis?.district?.en + '-' + dis?.district?.gu}</option>
                            })}
                        </Form.Select>

                    </Form.Group>

                    <Form.Group className="my-4" >
                        <Form.Label>Ghatak</Form.Label>

                        <Form.Select className="custom-select" aria-label="Default select example"
                            value={filterData?.ghatak}
                            onChange={(e) => setFilter_Data('ghatak', e.target.value)}
                        >
                            <option value=''>All Ghataks</option>
                            {filteredLocation?.ghatakList?.length > 0 && filteredLocation.ghatakList.map((ghtk, i) => {
                                return <option key={i} value={ghtk?.ghatak_name?.en}>{ghtk?.ghatak_name?.en + '-' + ghtk?.ghatak_name?.gu}</option>
                            })}
                        </Form.Select>
                    </Form.Group>


                    <Form.Group className="my-4" >
                        <Form.Label>Sector</Form.Label>
                        <Form.Select className="custom-select" aria-label="Default select example"
                            value={filterData?.sector}
                            onChange={(e) => setFilter_Data('sector', e.target.value)}
                        >
                            <option value=''>All Sectors</option>
                            {filteredLocation?.sectorList?.length > 0 && filteredLocation.sectorList.map((sec, i) => {
                                return <option key={i} value={sec?.sector_name?.en}>{sec?.sector_name?.en + '-' + sec?.sector_name?.gu}</option>
                            })}
                        </Form.Select>
                    </Form.Group>



                    <div className='d-flex justify-content-center gap-4'>


                        <button className='sbutton text-center' type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                handleClearFilter()
                              
                                // handleFilterModalClose()
                            }}
                            style={{ width: '80%', marginTop: '2rem' }}
                        >
                            Clear All
                        </button>

                        <button className='sbutton text-center' type='submit'
                            style={{ width: '80%', marginTop: '2rem' }}
                        >
                            Apply
                        </button>
                    </div>
                </Form>


            </Modal.Body>

        </Modal>
    )
}

export default FilterModalComponent