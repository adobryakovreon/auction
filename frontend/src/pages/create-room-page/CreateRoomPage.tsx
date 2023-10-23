import Box from "@mui/material/Box/Box";

const CreateRoomPage = () => {
    const userName = localStorage.getItem("userName") || "guest";
    
    return (
    <Box>
        CREATE ROOM PAGE, {userName}
    </Box>
    );
}
 
export default CreateRoomPage;