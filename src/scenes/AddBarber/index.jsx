import axios from "axios";
import { useState, useContext } from "react";
import { BarbersContext } from "../../context/barbers";
import "./form.css";

const AddBarberForm = () => {
  const { url } = useContext(BarbersContext);
  const [response, setResponse] = useState();
  const [user, setUser] = useState({
    user_Name: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  async function addNewBarber() {
    try {
      const res = await axios.post(url, {
        barber_Name: user.user_Name,
        password: user.password,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await addNewBarber();
    if (result) {
      alert("Barber Added successfully!");
    } else {
      alert("Error: Something went wrong...");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="add-user-form">
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
      <br />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddBarberForm;
