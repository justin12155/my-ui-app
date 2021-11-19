import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchEnv = () => {
  const theme = createTheme();
  const [myOptions, setMyOptions] = React.useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      environment: data.get("environment")
    });
  };

  const getDataFromAPI = () => {
    console.log("Options Fetched from API");

    fetch("http://localhost:8080/api/v1/cluster/brokers")
      .then((response) => {
        alert(response);
        return response.json();
      })
      .then((res) => {
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          myOptions.push(res.data[i].employee_name);
        }
        setMyOptions(myOptions);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main" }}
            src="/static/images/env.jpg"
          />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Autocomplete
              style={{ width: 500 }}
              freeSolo
              autoComplete
              autoHighlight
              id="environment"
              options={myOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={getDataFromAPI}
                  variant="outlined"
                  label="Search Environment"
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go To Workspace
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SearchEnv;
