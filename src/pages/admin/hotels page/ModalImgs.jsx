import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";


function ModalImgs({ setImgsModal, imgsModal, imgList }) {
  console.log(imgList);
  return (
    <div>
      <Dialog
        open={imgsModal}
        onClose={setImgsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Room Images"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {imgList.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} style={{ width: '100px', height: '100px' }} />
            ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setImgsModal(false)}
            sx={{ padding: "5px" }}
            variant="contained"
            color="primary"
          >
            Return
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalImgs;
