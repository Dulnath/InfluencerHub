import React from 'react';
import {useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import {Container,Row,Col} from 'react-bootstrap'
import Login from '../Login';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Datatable from '../Datatable';
import styles from "./styles.module.css";

// fetch('http://localhost:8080/api/users/getUsers')
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'birth_year',
  ]);

  useEffect(() => {
   fetch('https://swapi.dev/api/people')
  //  fetch('http://localhost:8080/api/users/getUsers')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

/*
  useEffect(() => {
    fetch('https://swapi.dev/api/people').then((response) => {
         setData(response.data);
    })
}, [])
*/
  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  //const columns = data[0] && Object.keys(data[0]);
  const [columns] = useState([]);
  return (
    <div>
      <div>
        <input
          type='text'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type='checkbox'
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column],
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
}