import React from "react";
import { Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const setData = (data) => {
    let { id, name, checkbox, gender, birthDate } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Name", name);
    localStorage.setItem("Date Of Birth", birthDate);
    localStorage.setItem("Gender", gender);
    localStorage.setItem("Checkbox", checkbox);
  };
  const getData = () => {
    axios.get(`http://localhost:3006/contacts`).then((getData) => {
      setAPIData(getData.data);
    });
  };
  const onDelete = (id) => {
    axios.delete(`http://localhost:3006/contacts/${id}`).then(() => {
      getData();
    });
    alert("You are deleting One Item");
  };
  useEffect(() => {
    axios.get(`http://localhost:3006/contacts`).then((response) => {
      setAPIData(response.data);
    });
  }, []);
  console.log(APIData);

  const calAge = (date) => {
    return new Date(Date.now() - new Date(date).getTime()).getFullYear() - 1970;
  };

  return (
    <div>
      <Link to="/create">
        <Button>Add New</Button>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Date Of Birth</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Checkbox</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.birthDate}</Table.Cell>
                <Table.Cell>
                  <p
                    style={{
                      color: calAge(data.birthDate) <= 8 ? "red" : "black",
                    }}
                  >
                    {calAge(data.birthDate)}
                  </p>
                </Table.Cell>
                <Table.Cell>{data.gender}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "Agreed" : "Not Agreed"}
                </Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
