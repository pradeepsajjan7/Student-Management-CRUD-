import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

export default function Create() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [checkbox, setCheckbox] = useState();

  let history = useHistory();
  const postData = () => {
    axios
      .post(`http://localhost:3006/contacts`, {
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
          <label>Name</label>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </Form.Field>
        <Form.Field>
          <label>Enter Date Of Birth</label>
          <input
            placeholder="Date Of Birth"
            type="Date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max="2013-01-01"
            required
          />
        </Form.Field>
        <Form.Field>
          <div>
            <h3>Gender</h3>
            <input
              type="radio"
              checked={gender === "Male"}
              value="Male"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label>Male</label>
          </div>
          <div>
            <input
              type="radio"
              checked={gender === "Female"}
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
            <label>Female</label>
          </div>
        </Form.Field>
        <Form.Field>
          <label>Agree to the Terms and Conditions</label>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={() => {
              setCheckbox(!checkbox);
            }}
            required
          />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
