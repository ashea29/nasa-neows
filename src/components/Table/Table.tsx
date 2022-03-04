import React, { useState, useRef, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { useAppSelector } from '../../state/hooks';
import { 
  selectTableData, 
  selectTableDataLoading,
} from '../../state/Entities/Table/table'

import {
  updateRowHeight, 
  autoSizeAllColumns 
} from './Table.utilities'

import 'ag-grid-community/dist/styles/ag-grid.min.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.min.css'
import styles from './Table.module.scss'
import Spinner from '../Spinner/Spinner';


const Table: React.FC = () => {
  const tableData = useAppSelector(selectTableData)
  const isLoading = useAppSelector(selectTableDataLoading)

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
      filter: true,
      cellClass: styles.cells
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

  return (
    <article className={styles["table-container"]}>
      <div className={`ag-theme-alpine-dark ${styles.grid}`}>
        {isLoading ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    </article>
 );
}


export default Table