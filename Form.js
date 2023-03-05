import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA25dm3sclxkYcnSnZ1d0e-RT5kspY5TeM",
  authDomain: "data-collector-11262.firebaseapp.com",
  databaseURL: "https://data-collector-11262-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-collector-11262",
  storageBucket: "data-collector-11262.appspot.com",
  messagingSenderId: "712578451958",
  appId: "1:712578451958:web:ca8495ce61b981e8669fd7",
  measurementId: "G-PL81QWCMNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const db = getDatabase();
    const formDataRef = ref(db, "formData");
    set(formDataRef, formData);
    setFormData({ name: "", gender: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="email">Gender</label>
      <input
	type="text"
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;

