import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const NavLinkWrapper = forwardRef((props, ref) => {
  console.count("EventLink");
  // NOTE: Navlink uses 'innerRef' property as oppose to 'ref' property in Material-UI components
  return <NavLink {...props} innerRef={ref} />;
});
export default NavLinkWrapper;
