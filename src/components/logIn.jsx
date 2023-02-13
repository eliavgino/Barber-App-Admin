import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { PagenationContext } from '../context/pagenation';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { authUser, users } = useContext(UserContext);
  const {setPage}=useContext(PagenationContext);

  const navigate=useNavigate();

  const [user, setUser] = useState({
    email: null,
    password: null,
  });

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
      <Box sx={{display:"flex",justifyContent:"center"}} component="div">

        <Box sx={{width:"35vw",backgroundColor:"white",marginTop:"3%"}} component="div" className="LogInContainer">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form
                onSubmit={async(e) => {
                  e.preventDefault();
                  e.target.reset();
                  authUser(user);
                  const response= await authUser(user);
                  if(response){

                    setPage('app')

                  }

                }}
              >
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(ev) =>
                          setUser({ ...user, email: ev.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        onChange={(ev) =>
                          setUser({ ...user, password: ev.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 17, mb: 2 }}
                  >
                    Log in
                  </Button>

                  <Grid container justifyContent="flex-end">
                    <Grid item>
                     
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>

        </Box>
      </Box>  
  );
};

export default Login;