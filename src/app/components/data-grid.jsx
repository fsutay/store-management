"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { setUpdatingStore,deleteStores } from "../store/storesSlice";
import { useSelector, useDispatch } from 'react-redux';
import { DataGridPro } from '@mui/x-data-grid-pro';

const DataTable = () => {
  const { storeList } = useSelector((state) => state.storesStore);
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const deleteRows = () => {
    dispatch(deleteStores(selectedRows));
  }

  const columns = [
    { field: 'id', headerName: 'id', width: 90 },
    {
      field: 'storeName',
      headerName: 'Store Name',
      width: 150,
      editable: false,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 150,
      editable: false,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 150,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 110,
      editable: false,
    }, {
      field: "action",//burası silinse daha iyi olur
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          dispatch(setUpdatingStore(params.row));
        };

        return <Button onClick={onClick} className='bg-primary text-white'>Edit</Button>;
      }
    },
  ];
  return (
    <div className='container mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 bg-slate-100 pt-10' >
    <Box>
      <Button onClick={deleteRows} className='bg-primary text-white mb-3'>Delete</Button>
      <DataGridPro
        rows={storeList}
        columns={columns}
        checkboxSelection
        disableColumnMenu
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={itm => console.log(itm)}
        onRowSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        disableColumnFilter
        unstable_headerFilters
        slots={{
          headerFilterMenu: null,
        }}
      />
    </Box>
    </div>
  );
};

export default DataTable;
