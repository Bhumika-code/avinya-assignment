import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css"


const Header = () => {
  return (
    <><header className="jal-header">
          <div className="jal-header-top">
              <div className="jal-logo">
                  <img src="https://www.jal.co.jp/jp/en/commonY20/img_sites/logo_jal.svg" class="header-logo-jal" alt="JAPAN AIRLINES" />
              </div>
             <div>
                <div className="right-header">
                   <p> japan-English</p>
                   <button className="login">login</button>

                </div>
             </div>
          </div>
      </header><h className="hr-line" />
      <div className="header2">
 <nav className="jal-nav">
                  <NavLink
                      to="/domestic"
                 className="nav-item"
                  >
                      Domestic
                  </NavLink>
                  <NavLink
                      to="/international"
                     className="nav-item"
                  >
                      International
                  </NavLink>
              </nav>
      </div></>
  );
};

export default Header;
