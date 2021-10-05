import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function Sidebar() {
  return (
    <div>
      <Menu fluid vertical tabular>
        <Menu.Item>
          <h2>Operasyonlar</h2>
        </Menu.Item>
        <Menu.Item name="Çalışanlar" as={NavLink} to="/employee" />
        <Menu.Item name="İş Verenler" as={NavLink} to="/employer" />
        <Menu.Item name="İş Arayanlar" as={NavLink} to="/candidate" />
        <Menu.Item name="İş Listesi" as={NavLink} to="/job" />
      </Menu>
    </div>
  );
}
