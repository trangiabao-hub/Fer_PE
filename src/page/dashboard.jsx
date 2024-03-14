import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

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

export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState();
  const [updateStudent, setUpdateStudent] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);

  // initValue
  const [initValue, setInitValue] = useState({
    id: "",
    name: "",
    dateofbirth: "",
    gender: "",
    class: "",
    image: "",
    feedback: "",
  });

  // validationSchema
  const validationSchema = Yup.object().shape({
    id: Yup.string().required("Enter id!"),
    name: Yup.string()
      .required("Enter name!")
      .test("moreThan2Word", "Name must be more than 2 words", (value) => value.split(" ").length > 2),
    dateofbirth: Yup.date().required("Enter date of birth!"),
    gender: Yup.string().required("Enter gender!"),
    class: Yup.string().required("Enter class!"),
    image: Yup.string().required("Enter image!").url("Image must be URL!"),
    feedback: Yup.string().required("Enter feedback!"),
  });

  // submit handler
  const onSubmit = async (values) => {
    console.log(values);
    if (updateStudent) {
      const response = await axios.put(
        `https://65f2fe66105614e6549f7fe9.mockapi.io/studentManagement/${updateStudent.id}`,
        {
          ...values,
          gender: values.gender === "Male" ? true : false,
        }
      );
      setUpdateStudent(null);
    } else {
      const response = await axios.post("https://65f2fe66105614e6549f7fe9.mockapi.io/studentManagement", {
        ...values,
        gender: values.gender === "Male" ? true : false,
      });
    }

    alert("Successful submission");
    setInitValue({
      id: "",
      name: "",
      dateofbirth: "",
      gender: "",
      class: "",
      image: "",
      feedback: "",
    });
    setOpen(false);

    fetchStudent();
  };

  const fetchStudent = async () => {
    const response = await axios.get("https://65f2fe66105614e6549f7fe9.mockapi.io/studentManagement");
    setStudents(response.data);
  };

  useEffect(() => {
    // chạy 1 lần duy nhất khi load trang lên
    fetchStudent();
  }, []);

  const deleteStudentHandler = async () => {
    await axios.delete(`https://65f2fe66105614e6549f7fe9.mockapi.io/studentManagement/${deleteStudent.id}`);
    alert("deleteStudent success");
    fetchStudent();
    setOpenConfirm(false);
  };

  return (
    <div className="page">
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add new student
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date Of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.dateofbirth}</TableCell>
                <TableCell>{student.gender ? "Male" : "Female"}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Avatar src={student.image} />
                </TableCell>
                <TableCell>{student.feedback}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setUpdateStudent(student);
                      setOpen(true);
                      setInitValue({
                        ...student,
                        gender: student.gender ? "Male" : "Female",
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      setDeleteStudent(student);
                      setOpenConfirm(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInitValue({
            id: "",
            name: "",
            dateofbirth: "",
            gender: "",
            class: "",
            image: "",
            feedback: "",
          });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new student
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initValue}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmit }) => {
                return (
                  <Form className="form">
                    <div>
                      <label htmlFor="id">ID</label>
                      <Field type="text" name="id" />
                      <ErrorMessage name="id" component="div" />
                    </div>
                    <div>
                      <label htmlFor="name">Name</label>
                      <Field type="text" name="name" />
                      <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                      <label htmlFor="dateofbirth">Date of Birth</label>
                      <Field type="date" name="dateofbirth" />
                      <ErrorMessage name="dateofbirth" component="div" />
                    </div>
                    <div>
                      <label htmlFor="gender">Gender</label>
                      <Field as="select" name="gender">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      <ErrorMessage name="gender" component="div" />
                    </div>
                    <div>
                      <label htmlFor="class">Class</label>
                      <Field type="text" name="class" />
                      <ErrorMessage name="class" component="div" />
                    </div>
                    <div>
                      <label htmlFor="image">Image URL</label>
                      <Field type="text" name="image" />
                      <ErrorMessage name="image" component="div" />
                    </div>
                    <div>
                      <label htmlFor="feedback">Feedback</label>
                      <Field as="select" name="feedback">
                        <option value="">Select Feedback</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                      </Field>
                      <ErrorMessage name="feedback" component="div" />
                    </div>
                    <Button variant="contained" className="submit-btn" type="submit" disabled={isSubmit}>
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Typography>
        </Box>
      </Modal>

      <Dialog
        open={openConfirm}
        onClose={() => setDeleteStudent(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Disagree</Button>
          <Button onClick={deleteStudentHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
