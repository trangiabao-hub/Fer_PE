import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const [student, setStudent] = useState([]);
  const params = useParams();
  const fetchStudent = async () => {
    const response = await axios.get(`https://65f2fe66105614e6549f7fe9.mockapi.io/studentManagement/${params.id}`);
    setStudent(response.data);
  };

  useEffect(() => {
    // chạy 1 lần duy nhất khi load trang lên
    fetchStudent();
  }, []);

  return (
    <div className="page">
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {student.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Mac Miller
            </Typography>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 1000 }} image={student.image} alt="Live from space album cover" />
      </Card>
    </div>
  );
};
