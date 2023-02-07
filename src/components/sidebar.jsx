import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from '../icons/app_logo_transparent.svg'
import smallLogo from '../icons/dark.png'
import monitor from '../icons/basic/monitor.png'
import place from '../icons/basic/place.png'
import team from '../icons/basic/team.png'
import onlinesurvey from '../icons/basic/online-survey.png'
import map from '../icons/basic/map.png'
import clipboard from '../icons/basic/clipboard.png'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
  
  const { t } = useTranslation();
    const Navigate = useNavigate();

  const handleLogoClick = () => {
    Navigate('/home')
  }



  return (

    <div id="sidebar-wrapper" className='sidebar-wrapper p-0 sidebar-expanded'>
      <ul className="navbar-nav pt-4">

        <li className="nav-item main-logo-wrapper " id="primary-logo">
          <img src={Logo} className="main-logo cursor-point" alt="..." onClick={handleLogoClick} />
        </li>

        <li className="nav-item main-logo-wrapper d-none" id="secondary-logo">
          <img src={smallLogo} className="main-small-logo cursor-point" alt="..." onClick={handleLogoClick} />
        </li>

        <li className="nav-item mt-4">
          <NavLink to='/home' ><img src={monitor} width="30"/><span>{t('dashboard')}</span></NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/users"><img src={team} width="30"/><span>{t('user')}</span></NavLink>
        </li>

        {/* <li className="nav-item">
          <NavLink to="/projects"><img src={clipboard} width="30"/><span>{t('project')}</span></NavLink>
        </li> */}

        <li className="nav-item">
          <NavLink to="/districts"><img src={map} width="30"/><span>{t('district')}</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ghatak"><img src={clipboard} width="30"/><span>{t('ghatak')}</span></NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/sectors"><img src={place} width="30"/><span>{t('sector')}</span></NavLink>
        </li>



        <li className="nav-item">
          <NavLink to="/visits"><img src={onlinesurvey} width="30"/><span>{t('visits')}</span></NavLink>
        </li>

      </ul>

    </div>

  )
}


export default Sidebar;