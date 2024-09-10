import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
function ModalDelete({setDeleteModal,deleteModal,handleDelete}) {
  return (
    <div>
      <Dialog
        open={deleteModal}
        onClose={setDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}  sx={{ padding: '5px' }} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete}  sx={{ padding: '5px'}} variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalDelete;

