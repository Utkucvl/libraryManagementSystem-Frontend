import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import { IconButton } from "@mui/material";



function Navbar() {
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LIBRARY PLACE MANAGEMENT APP
          </Typography>
          <Button color="inherit" onClick={handleOpen}>
            Contact 
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                INFORMATIONS:
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <IconButton><EmailIcon></EmailIcon></IconButton>
                utku.cuval0507@gmail.com
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <IconButton><LinkedInIcon></LinkedInIcon></IconButton>
                Utku Çuval
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <IconButton><SchoolIcon></SchoolIcon></IconButton>
                Abdullah Gul University
              </Typography>
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
