import React, { useState } from "react";
import { GetRequest, UpdateRequest } from "../services/HttpServices";
import { useEffect } from "react";
import ChairAltIcon from "@mui/icons-material/ChairAlt";
import { Button, IconButton } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

function PlaceList() {
  let messageController = 0 ;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [idOfModal, setIdOfModal] = useState([]);
  const [stateOfEmpty,setStateOfEmpty] = useState([])
  const [stateOfBreak,setStateOfBreak] = useState([])
  const [placeList, setPlaceList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPlaceList = () => {
    GetRequest("/place")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setPlaceList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleTakeAChair = () => {
    UpdateRequest("/place/" + idOfModal, {
      itEmpty: false,
      itOnBreak:false
    });
  };
  const handleLetTheChair = () => {
    UpdateRequest("/place/reverseUpdate/" + idOfModal, {
      itEmpty: true,
      itOnBreak:false
    });
  };
  const handleTakeABreak = () => {
    UpdateRequest("/place/break/" + idOfModal, {
      itEmpty: stateOfEmpty,
      itOnBreak:true
    });
    setTimeout(handleLetTheBreak,300000)
  };
  const handleLetTheBreak = () => {
    UpdateRequest("/place/break/" + idOfModal, {
      itEmpty: stateOfEmpty,
      itOnBreak:false
    });
  };
  const showErrorMessage = (message) =>{
    alertify.error(message,2);
  }

  const showSuccessMessage = (message) =>{
    alertify.success(message,2);

  }


  const whichColor = (place) =>{
    if(place.itOnBreak === true )
    return "green"
    else if (place.itEmpty === true )
    return "grey"
    else
    return "red"
  }

  useEffect(() => {
    getPlaceList();
  }, []);

  useEffect(() => {
    getPlaceList();
  }, [placeList]);

  return (
    <div>
      <h3>
        Empty chair :{" "}
        {
          <IconButton>
            <ChairAltIcon></ChairAltIcon>
          </IconButton>
        }
      </h3>
      <h3>
        Non-Empty chair :{" "}
        {
          <IconButton>
            <ChairAltIcon style={{ color: "red" }}></ChairAltIcon>
          </IconButton>
        }{" "}
      </h3>
      <h3>
        Chair on break :{" "}
        {
          <IconButton>
            <ChairAltIcon style={{ color: "green" }}></ChairAltIcon>
          </IconButton>
        }{" "}
      </h3>
      <h3 style={{textAlign:"right" }}>Total number of chair : {placeList.length}</h3>
      <h3 style={{textAlign:"right" }}>Number of empty chair : {placeList.filter(place =>{ return place.itEmpty === true}).length}</h3>
      <h3 style={{textAlign:"right" }}>Number of non-empty chair : {placeList.filter(place =>{ return place.itEmpty !== true}).length}</h3>
      {placeList.map((place) => {
        return (
          <IconButton>
            <ChairAltIcon
              style={{
                width: "100px",
                height: "100px",
                padding: "120px",
                color: whichColor(place)
              }}
              onClick={() => {
                handleOpen();
                setIdOfModal(place.id);
                setStateOfEmpty(place.itEmpty)
                setStateOfBreak(place.itOnBreak)
              }}
            ></ChairAltIcon>
          </IconButton>
        );
      })}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              style={{ margin: "10px" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Choose an action on chair that has id "{idOfModal}"
            </Typography>
            <Button
              style={{ background: "lightBlue", color: "black", margin: "5px" }}
              size="sm"
              onClick={() => {
                handleTakeAChair();
                handleClose();
                {stateOfEmpty=== false ? showErrorMessage("You have already a chair ") : showSuccessMessage("You have taken a chair")}
              }}
            >
              Take a chair
            </Button>{" "}
            <Button
              style={{ background: "lightBlue", color: "black", margin: "5px" }}
              size="sm"
              onClick={() => {
                handleLetTheChair();
                handleClose();
                {stateOfEmpty=== true ? showErrorMessage("You dont have any chair ") : showSuccessMessage("You have let the chair")}
              }}
            >
              Let the chair
            </Button>{" "}
            <Button
              style={{ background: "lightBlue", color: "black", margin: "5px" }}
              size="sm"
              onClick={()=>{
                handleTakeABreak();
                handleClose();
                {stateOfEmpty=== true ? showErrorMessage("You dont have a chair , for break you need to have a chair") : showSuccessMessage("You have taken break")}
              }}
            >
              Take a break for 5 minute
            </Button>{" "}
            <Button
              style={{ background: "lightBlue", color: "black", margin: "5px" }}
              size="sm"
              onClick={()=>{
                handleLetTheBreak();
                handleClose();  
                {stateOfBreak=== true ? showSuccessMessage("You have let the break") : showErrorMessage("You need to be in a break to let the break")}
              }}
            >
              Let the break
            </Button>{" "}
            <Button
              style={{ background: "red", color: "white", margin: "5px" }}
              size="sm"
              onClick={handleClose}
            >
              X
            </Button>{" "}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default PlaceList;
