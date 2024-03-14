import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [students, setStudents] = useState([]);

  const fetchStudent = async () => {
    const response = await axios.get("https://65f2fe66105614e6549f7fe9.mockapi.io/studentManagement");
    setStudents(response.data);
  };

  useEffect(() => {
    // chạy 1 lần duy nhất khi load trang lên
    fetchStudent();
  }, []);

  // map: chuyển từ dạng object sang jsx => hiển thị đc lên màn hình

  return (
    <div className="page">
      <Grid container spacing={3}>
        {students
          .sort((item1, item2) => item1.name.localeCompare(item2.name))
          .map((student) => (
            <Grid item xs={4} key={student.id}>
              <Card>
                <CardMedia sx={{ height: 400 }} image={student.image} title="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {student.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                    continents except Antarctica
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/detail/${student.id}`}>Detail</Link>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
