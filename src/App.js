import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bugAdded, bugResolved, bugRemoved } from "./redux/actions";
import { TextField, Button, Box, AppBar, Toolbar, Typography } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Bug description is required")
});

const App = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const bugs = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddBug = () => {
    validationSchema
      .validate({ description })
      .then(() => {
        dispatch(bugAdded(description));
        setDescription("");
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleResolveBug = (id) => {
    dispatch(bugResolved(id));
  };

  const handleRemoveBug = (id) => {
    dispatch(bugRemoved(id));
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bug Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "50%" }}>
          <TextField
            label="Bug Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={error !== null}
            helperText={error}
            sx={{ marginLeft: "10px", marginRight: "10px", flex: 1 }}
          />
          <Button variant="contained" onClick={handleAddBug} sx={{ height: "56px" }}>
            Add Bug
          </Button>
        </Box>
      </div>
      {bugs.length > 0 ? (
        bugs.map((bug) => (
          <div
            key={bug.id}
            style={{ marginTop: "10px", marginBottom: "10px", padding: "10px", backgroundColor: "#f5f5f5" }}
          >
            <p style={{ fontWeight: "bold" }}>Description: {bug.description}</p>
            <p>Resolved: {bug.resolved ? "Yes" : "No"}</p>

            <Button
              sx={{ marginLeft: "10px", marginRight: "10px" }}
              variant={bug.resolved ? "outlined" : "contained"}
              onClick={() => handleResolveBug(bug.id)}
            >
              {bug.resolved ? "Unresolved" : "Resolve"}
            </Button>
            <Button
              sx={{ marginLeft: "10px", marginRight: "10px" }}
              variant="contained"
              color="error"
              onClick={() => handleRemoveBug(bug.id)}
            >
              Delete
            </Button>
          </div>
        ))
      ) : (
        <p>*Not any bug pending</p>
      )}
    </div>
  );
};

export default App;
