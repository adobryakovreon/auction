import { Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { useState } from "react";
import ModalWrapper from "../../shared/components/modal-wrapper/ModalWrapper";
import { NewUserForm } from "../../shared/components/new-user-form/NewUserForm";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const name = localStorage.getItem("userName") || "guest";
  const navigate = useNavigate()
    localStorage.removeItem("userName")
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("");
  const handleEnterApp = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value);
    if (!localStorage.getItem("userName")) {
      setOpen(true);
      setRoute(event.currentTarget.value);
        return
    }
    navigate(event.currentTarget.value);
  };

  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Welcome, {name}!</Typography>
        <Box>
          <Button
            value="create-room"
            variant="outlined"
            onClick={handleEnterApp}
          >
            Создать комнату
          </Button>
          <Button value="find-room" variant="outlined" onClick={handleEnterApp}>
            Найти комнату
          </Button>
        </Box>
      </Container>
      <ModalWrapper open={open}>
        <NewUserForm route={route} setOpen={setOpen} />
      </ModalWrapper>
    </Box>
  );
};

export default Homepage;
