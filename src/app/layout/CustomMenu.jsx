import * as React from 'react';
import { createElement } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import {
  DashboardMenuItem,
  Menu,
  MenuItemLink,
  getResources,
} from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import LabelIcon from '@material-ui/icons/Label';
import { capitalizeFirstLetter } from 'utils/format';
import ToggleDarkModeButton from 'app/components/ToggleDarkModeButton';

export const CustomMenu = props => {
  const resources = useSelector(getResources);
  const open = useSelector(state => state.admin.ui.sidebarOpen);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <Menu {...props}>
      {isMobile ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ToggleDarkModeButton />
        </div>
      ) : null}
      <DashboardMenuItem />
      {resources.map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={
            (resource.options && resource.options.label) ||
            capitalizeFirstLetter(resource.name)
          }
          leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
          onClick={props.onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      {/* add your custom menus here */}
    </Menu>
  );
};
export default CustomMenu;
