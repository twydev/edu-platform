import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import SignOutButton from '../SignOut';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import BookIcon from '@material-ui/icons/Book';
import EventIcon from '@material-ui/icons/Event';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

import { styles } from './NavigationBar_Styles'

class NavigationBar extends React.Component {
  
  /***** COMPONENTS STATES *****/
  
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    drawerEl: null,
  };

  /***** EVENT LISTENERS *****/ 
  
  handleDrawerOpen = event => {
    this.setState({ drawerEl: event.currentTarget });
  }

  handleDrawerClose = () => {
    this.setState({ drawerEl: null });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleSignOut = () => {
    this.handleMenuClose();
    this.signOutHandler.signOut();
  }

  /***** RENDER METHODS *****/

  render() {
    const { anchorEl, mobileMoreAnchorEl, drawerEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isDrawerOpen = Boolean(drawerEl);

    const renderMenu = (
      <Menu className={classes.floatObj}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleSignOut}>
          <SignOutButton onRef={ref => (this.signOutHandler = ref)} />  Logout
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu className={classes.floatObj}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose} component={Link} to={ROUTES.INBOX}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    const renderDrawerMenu = (
      <Drawer
        drawerEl={drawerEl}
        open={isDrawerOpen}
        onClose={this.handleDrawerClose}
        className={classes.drawer}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button key='New Lessons' onClick={this.handleDrawerClose} component={Link} to={ROUTES.LANDING}>
            <ListItemIcon><FiberNewIcon color='error' style={{ fontSize: 30 }} /></ListItemIcon>
            <ListItemText primary='New Lessons' />
          </ListItem>
          <ListItem button key='Syllabus' onClick={this.handleDrawerClose} component={Link} to={ROUTES.SYLLABUS}>
            <ListItemIcon><BookIcon style={{ fontSize: 30 }} /></ListItemIcon>
            <ListItemText primary='Syllabus' />
          </ListItem>
          <ListItem button key='Schedule'>
            <ListItemIcon><EventIcon style={{ fontSize: 30 }} /></ListItemIcon>
            <ListItemText primary='Schedule' />
          </ListItem>
          <ListItem button key='Gallery'>
            <ListItemIcon><InsertPhotoIcon style={{ fontSize: 30 }} /></ListItemIcon>
            <ListItemText primary='Gallery' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='Billing'>
            <ListItemIcon><CreditCardIcon style={{ fontSize: 30 }} /></ListItemIcon>
            <ListItemText primary='Billing' />
          </ListItem>
          <ListItem button key='Help'>
            <ListItemIcon><RecordVoiceOverIcon style={{ fontSize: 30 }} /></ListItemIcon>
            <ListItemText primary='Help' />
          </ListItem>
        </List>
      </Drawer>
    );

    const theme = createMuiTheme({
      palette: {
        primary: pink,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer"
            onClick={isDrawerOpen ? this.handleDrawerClose : this.handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Platform.edu
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" component={Link} to={ROUTES.INBOX}>
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {renderDrawerMenu}
      </div>
      </MuiThemeProvider>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);