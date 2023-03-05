import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from "react";

// Firebase configuration
const firebaseConfig = {
// Enter your configuration
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

