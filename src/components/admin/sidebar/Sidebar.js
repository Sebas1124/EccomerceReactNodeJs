import React, { useContext, useState } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/img/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../../assets/data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { AuthContext } from './../../../auth/AuthContext';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const [ selected, setSelected ] = useState(0);
  const [ expanded, setExpaned ] = useState(true);
  const { auth, logout } = useContext( AuthContext );

  const history = useNavigate();

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  const changeScreen = ( screen ) => {
    history(screen);
  }

  return (
    <>
      <div className="bars" style={ expanded ? {left: '60%'} : {left: '5%' }} onClick={ () => setExpaned( !expanded )}>
        <UilBars />
      </div>
    <motion.div 
      className='sidebar'
      variants={ sidebarVariants }
      animate={ window.innerWidth <= 768 ? `${ expanded }` : '' }>

      {/* logo */}
      <div className="logo">
        <img src={ Logo } alt="logo" />
        <span>
          S<span>Watch</span>
        </span>
      </div>

      <div className="menu">
        { 
          SidebarData.map( ( item, index ) => {
            return (
              <div
                className={ selected === index ? "menuItem active" : "menuItem" }
                key={ index }
                onClick={ () => setSelected( index ) } 
              >
                <item.icon onClick={ () => changeScreen( item.to ) } />
                <span onClick={ () => changeScreen( item.to ) }>{ item.heading }</span>
              </div>
            );
          })
        }

        {/* signoutIcon */}
        <div className="menuItem" onClick={ logout }>
          <span>Logout </span> <UilSignOutAlt/>
        </div>

      </div>
      
    </motion.div>
    </>
  );
};

export default Sidebar;
