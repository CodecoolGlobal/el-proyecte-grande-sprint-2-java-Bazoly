import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' active>
      Employees
    </NavigationItem>
    <NavigationItem link='/'>Transactions</NavigationItem>
  </ul>
);

export default navigationItems;
