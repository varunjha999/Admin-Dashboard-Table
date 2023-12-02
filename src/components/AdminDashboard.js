import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import '../App.css';

export default function AdminDashboard() {
  const columns = [
    {
      name: "S.N",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Action",
      cell: (row) => (
        <React.Fragment>
          {/* <button className="btn btn-primary" onClick={() => handleEdit(row.id)}>
            Edit
          </button> */}
          <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>
            Delete
          </button>
        </React.Fragment>
      ),
    },
  ];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const getData = async () => {
    try {
      const req = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const res = await req.json();
      setData(res);
      setFilter(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilter(result);
  }, [search, data]);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilter(updatedData);
  };

//   const handleEdit = (id) => {
//     // Implement your edit logic here
//     console.log(`Edit item with id: ${id}`);
//   };

  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#ccc",
      },
    },
  };

  return (
    <React.Fragment>
      <DataTable
        customStyles={tableHeaderstyle}
        columns={columns}
        data={filter}
        pagination
        selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="border border-primary rounded bg-gray-200 p-2"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        subHeaderAlign="left"
      />
    </React.Fragment>
  );
}
