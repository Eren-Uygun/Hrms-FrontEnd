  
import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div>
      <Menu pointing vertical>
        <Menu.Item name="Operasyonlar" />
        <Menu.Item name="Çalışanlar" as={NavLink} to="/employees" />
        <Menu.Item name="İş Verenler" as={NavLink} to="/employers" />
        <Menu.Item name="İş Arayanlar" as={NavLink} to="/candidates"/>
        <Menu.Item name="İş Listesi"  as={NavLink} to="/jobs"/>
      </Menu>
    </div>
  );
}