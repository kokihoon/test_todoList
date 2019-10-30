import React,{useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_FORM } from "../constants/action-types";
import { ADD_ARTICLE } from "../constants/action-types";
window.store = store;

function FormDialog() {

  const [open, setOpen] = useState(false);
  const [article, setAricle] = useState("");

  const handleClose = () => {
    store.dispatch({
      type: CLOSE_FORM,
      payload: {
        openFormDialog: false
      }
    });
  };

  const handleChange = name => event => {
    setAricle(event.target.value);
  };

  const handleSave = () => {
    store.dispatch({
      type: ADD_ARTICLE,
      payload: {
        title: article,
        id: store.getState()["articles"].length,
        date: new Date().toLocaleDateString()
      }
    });

    store.dispatch({
      type: CLOSE_FORM
    });
  };

  useState(() => {
    setOpen(store.getState()["uiState"]["openFormDialog"]);
    
    store.subscribe(() => {
      console.log(
        "Form Dialog State" + JSON.stringify(store.getState()["uiState"])
      );

      setOpen(store.getState()["uiState"]["openFormDialog"]);
    });

  })
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Article</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter new article.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Article"
              multiline
              rowsMax="4"
              rows="4"
              fullWidth
              onChange={handleChange("multiline")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default FormDialog;