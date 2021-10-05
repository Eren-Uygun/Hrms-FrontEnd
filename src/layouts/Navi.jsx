import React, { Component, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function Navi(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [activeItem, setActiveItem] = useState("home");

    const setActiveItemOnClick = (e, { name }) => {
      console.log(name);
      setActiveItem(name);
    };


  
    return (
        <div>
            <Menu inverted fixed="top" size="large">
            <Menu.Item name="Anasayfa" active={activeItem === "Anasayfa"} onClick={setActiveItemOnClick} as={NavLink} to="/" />
            <Menu.Item name="İş İlanları" active={activeItem === "İş İlanları"} onClick={setActiveItemOnClick} as={NavLink} to="/jobAdvertisements" />
            <Menu.Item name="Özgeçmişler" active={activeItem === "Özgeçmişler"} onClick={setActiveItemOnClick} as= {NavLink} to="/curriculumVitaes"/>


            {/* <Menu.Menu position="right">
              {isAuthenticated ? (
                <SignedIn signOut={handleSignOut} />
              ) : (
                <SignedOut signIn={handleSignIn} />
              )}
            </Menu.Menu> */}
        </Menu>
            
        </div>
    )
}
