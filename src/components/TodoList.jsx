import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const validationSchema = Yup.object({
    todolist: Yup.string()
      .min(5, () => <span>Too short</span>)
      .max(30, () => <span>Too Long</span>)
      .required(<span className="error">Required</span>),
  });

  const formik = useFormik({
    initialValues: {
      todolist: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setTodos([...todos, values.todolist]);
      resetForm();
    },
  });

  return (
    <div>
      <h1>TODO Список</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="todolist"
          name="todolist"
          label="Додати завдання"
          type="text"
          size="small"
          value={formik.values.todolist}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.todolist && Boolean(formik.errors.todolist)}
          helperText={formik.touched.todolist && formik.errors.todolist}
        />

        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List sx={{ width: "20%", maxWidth: 500 }}>
          {todos.map((todo, index) => (
            <ListItem
              sx={{
                "--Grid-borderWidth": "2px",
                border: "var(--Grid-borderWidth) solid",
                borderRadius: "5px",
                borderColor: "divider",
                marginBottom: "10px",
              }}
              key={index}
              disableGutters
            >
              <ListItemText sx={{ padding: "0 10px" }} primary={todo} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </div>
  );
};

export default TodoList;
