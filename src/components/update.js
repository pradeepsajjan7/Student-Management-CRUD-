import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Update() {
  let history = useHistory();
  const [id, setID] = useState(null);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setName(localStorage.getItem("Name"));
    setBirthDate(localStorage.getItem("Date Of Birth"));
    setGender(localStorage.getItem("Gender"));
    setCheckbox(localStorage.getItem("Checkbox"));
  }, []);

  const updateAPIData = () => {
    axios
      .put(`http://localhost:3006/contacts/${id}`, {
        name,
        birthDate,
        gender,
        checkbox,
      })
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Enter Date Of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max="2013-01-01"
            required
          />
        </Form.Field>
        <Form.Field>
          <div>
            <label>Male</label>
            <input
              type="radio"
              checked={gender === "Male"}
              value="Male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label>Female</label>
            <input
              type="radio"
              checked={gender === "Female"}
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>I agree to the Terms and Conditions</label>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => {
              setCheckbox(!checkbox);
            }}
          />
        </Form.Field>

        <Button type="submit" onClick={updateAPIData}>
          Update
        </Button>
      </Form>
    </div>
  );
}
