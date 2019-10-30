import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import store from "../store/index";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Edit";
import Comment from "@material-ui/icons/Error";
import { OPEN_EDIT_FORM } from "../constants/action-types";
import { SELECT_ARTICLE } from "../constants/action-types";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/Search";
window.store = store;

export const styles = theme => ({
  root: {
    width: "100%",
    height: 360,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    color: "#fff",
    backgroundColor: "#F00"
  }
});

function ListComponent() {

  const [checked, setChecked] = useState([]);
  const [items, setItems] = useState([]);

  const openEditDialog = value => {
    console.log("Edit");
    store.dispatch({
      type: OPEN_EDIT_FORM,
      payload: value
    });
  };

  useState(()=> {
    setItems(store.getState()["articles"]);
    setChecked(store.getState()["uiState"]["checked"]);
  
    store.subscribe(() => {

      setItems(store.getState()["articles"]);
      setChecked(store.getState()["uiState"]["checked"]);
      
    });
  
  })

  
  const handleChange = event => {
    // if (event.target.value.trim() !="")
    // {
    console.log("Search----------" + event.target.value);

    var updatedList = items;
    updatedList = updatedList.filter(function(item) {
      return (
        item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });

    setItems(updatedList);

    // var newArray = this.state.items.filter(function (item) {
    //   return item.title.indexOf(event.target.value) > 0;
    // });

    // this.setState({
    //   items: newArray
    // });
    // }else{

    // }
  };

  const handleToggle = value => () => {
    console.log("Select----------" + value);

    store.dispatch({
      type: SELECT_ARTICLE,
      payload: value
    });
  };


    return (
      <div className={{
        width: "100%",
        height: 360,
        backgroundColor: 'block'
      }}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Search"
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {items.length == 0 ? (
          <Card>
            <CardContent>
              <Comment />

              <Typography color="headline">No Data</Typography>
              <Typography className={{}} color="textSecondary">
                No Article found ¯\_(ツ)_/¯
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <List>
            {items.map(value => (
              <ListItem
                key={value.id}
                dense
                button
                className={{}}
              >
                <Checkbox
                  onChange={handleToggle(value.id)}
                  checked={checked.indexOf(value.id) !== -1}
                />

                <Avatar alt="Remy Sharp" className={{    color: "#fff",
    backgroundColor: "#F00"}}>
                  {value.id}
                </Avatar>

                <ListItemText primary={value.title} secondary={value.date} />

                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Comments"
                    onClick={() => openEditDialog(value)}
                  >
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
}

ListComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default ListComponent;
