import React,{useState, useEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/Delete";
import store from "../store/index";
import { DELETE_ARTICLE } from "../constants/action-types";

export const styles = {};
function SimpleAppBar() {

  const [checked, setChecked] = useState([])

  const handleDelete = () => {
    store.dispatch({
      type: DELETE_ARTICLE
    });
  };

  useState(()=> {
    setChecked(store.getState()["uiState"]["checked"]);

    store.subscribe(() => {

      setChecked(store.getState()["uiState"]["checked"]);
    });

  })
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="secondary">
            React Redux CRUD Sample
          </Typography>

          {checked.length !== 0 ? (
            <IconButton onClick={handleDelete} color="inherit">
              <AccountCircle />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleAppBar);
