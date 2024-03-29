import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_EDIT_FORM } from "../constants/action-types";
import { UPDATE_ARTICLE } from "../constants/action-types";
window.store = store;

function FormDialog() {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState(0);
  const [date, setDate] = useState('');

  const handleClose = () => {
    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  const handleChange = name => event => {
    console.log("New Value " + event.target.value);
    setTitle(event.target.value)
  };

  const handleSave = () => {
    store.dispatch({
      type: UPDATE_ARTICLE,
      payload: {
        title: title,
        id: id,
        date: date
      }
    });

    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  useEffect(()=> {
    setOpen(store.getState()["uiState"]["openEditDialog"]);
    setTitle(store.getState()["uiState"]["articleToEdit"]["title"])
    setId(store.getState()["uiState"]["articleToEdit"]["id"])
    setDate(store.getState()["uiState"]["articleToEdit"]["date"])
    store.subscribe(() => {
      console.log(
        "Edit Form Dialog State" + JSON.stringify(store.getState()["uiState"])
      );
      setOpen(store.getState()["uiState"]["openEditDialog"]);
      setTitle(store.getState()["uiState"]["articleToEdit"]["title"])
      setId(store.getState()["uiState"]["articleToEdit"]["id"])
      setDate(store.getState()["uiState"]["articleToEdit"]["date"])
      

  });
  })
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Article</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Update article.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Article"
              multiline
              defaultValue={title}
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