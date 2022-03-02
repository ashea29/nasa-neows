import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { 
  SET_USD, 
  SET_UED, 
  selectTableData, 
  selectTableDataLoading, 
  selectUserStartDate,
  selectDefaultStartDate, 
  selectUserEndDate,
  selectDefaultEndDate,
  selectDateParams
} from '../../state/Entities/Table/table'
import { loadTableData } from '../../state/Entities/Table/tableThunks'

import 'ag-grid-community/dist/styles/ag-grid.min.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.min.css'

import {
  updateRowHeight, 
  autoSizeAllColumns 
} from './Table.utilities'

import styles from './Table.module.scss'
import Form from '../Form/Form';


const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(selectTableData)
  const isLoading = useAppSelector(selectTableDataLoading)
  const dateParams = useAppSelector(selectDateParams)
  console.log(dateParams)

  const gridRef: any = useRef(null);

  let minRowHeight: number = 25
  let currentRowHeight: number

  const [columnDefs] = useState([
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Est. Diameter (m)', field: 'estimated_diameter' },
    { headerName: 'Potentially Hazardous', field: 'is_potentially_hazardous' },
    { headerName: 'Sentry Object', field: 'is_sentry_object' },
    { headerName: 'Velocity (km/h)', field: 'velocity' },
    { headerName: 'Miss Distance', field: 'miss_distance' },
    { headerName: 'Visual Magnitude', field: 'visual_magnitude' },
    { headerName: 'Close Approach Date/Time', field: 'close_approach_date' }
  ]);
  
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
      filter: true
    };
  }, []);

  const getRowHeight = useCallback(() => {
    return currentRowHeight;
  }, []);

  const onGridReady = useCallback((params: any) => {
    minRowHeight = params.api.getSizesForCurrentTheme().rowHeight;
    currentRowHeight = minRowHeight;
    autoSizeAllColumns(params)
  }, []);

  const onFirstDataRendered = useCallback(
    (params: any) => {
      updateRowHeight(params, minRowHeight, currentRowHeight);
    },
    [updateRowHeight]
  )

  const onGridSizeChanged = useCallback(
    (params: any) => {
      updateRowHeight(params, minRowHeight, currentRowHeight);
    },
    [updateRowHeight]
  )

  useEffect(() => {
    dispatch(loadTableData(dateParams))
  }, []);

  const handleClick = (e: any) => {
    console.log(gridRef.current.api)
  }

  return (
      <section className="centered-section">
        <div className={`${styles["table-group"]}`}>
          <Form />
          <div className="ag-theme-alpine-dark" style={{height: 400, width: 600}}>
              <button onClick={handleClick}>Load Data</button>
              <AgGridReact
                ref={gridRef}
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                getRowHeight={getRowHeight}
                onGridReady={onGridReady}
                onFirstDataRendered={onFirstDataRendered}
                onGridSizeChanged={onGridSizeChanged}
                rowSelection="multiple">
              </AgGridReact>
          </div>
        </div>
      </section>
 );
}


export default Table