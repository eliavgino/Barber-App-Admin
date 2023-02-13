import axios from "axios";
import { useState, useContext } from "react";
import { BarbersContext } from "../../context/barbers";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

import "./form.css";

const AddBarberForm = () => {
  const { url, addNewBarber } = useContext(BarbersContext);
  const [response, setResponse] = useState();
  const [profile, setprofile] = useState("");
  const [user, setUser] = useState({
    user_Name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const uploadImage = async () => {
    const format = new FormData();
    format.append("file", profile);
    format.append("upload_preset", "barbers");

    await axios
      .post("https://api.cloudinary.com/v1_1/ddwsr6uth/image/upload", format)
      .then((response) => {
        console.log(response);
        console.log(response.data.secure_url);
        console.log(user.user_Name);
        console.log(user.password);
        console.log(user.email);
        console.log(user.phoneNumber);
        console.log(response.data.secure_url);
        let result = addNewBarber({
          barber_Name: user.user_Name,
          password: user.password,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePhoto: response.data.secure_url,
        });
        if (result) {
          alert("Barber Added successfully!");
        } else {
          alert("Error: Something went wrong...");
        }
      });
    console.log(profile);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <form
        onSubmit={uploadImage}
        className="add-user-form"
        style={{ width: "80vw" }}
      >
        <label htmlFor="user_Name">User Name:</label>
        <input
          type="text"
          id="user_Name"
          name="user_Name"
          value={user.user_Name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
        />
        <label
          htmlFor="upload-photo"
          style={{ marginRight: "1%", marginLeft: "1%" }}
        >
          Add Profile Photo :
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={(e) => {
              setprofile(e.target.files[0]);
            }}
          />
          <Fab color="primary" size="small" component="span" aria-label="add">
            <AddToPhotosIcon />
          </Fab>
        </label>
        <br />
      </form>
      <Button
        type="submit"
        color="secondary"
        variant="contained"
        onClick={uploadImage}
      >
        Add User
      </Button>
    </div>
  );
};

export default AddBarberForm;
