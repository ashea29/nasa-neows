import React from 'react'

import {
  handleStartDateInput,
  handleEndDateInput,
  handleSubmit
} from './Form.utilities'

import styles from './Form.module.scss'
import { useAppDispatch } from '../../state/hooks'

const Form: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <React.Fragment>
      <form id='form' className={`flex-row`}>
        <div className={`${styles["form-group"]} flex-row`} id="fg-start">
            <label>Start Date:</label>
            <input 
              type="date" 
              id="startDate" 
              name="startDate"
              onInput={(e) => handleStartDateInput(e, dispatch)} 
            />
        </div> <br />
        <div className={`${styles["form-group"]} flex-row`} id="fg-end">
            <label>End Date:</label>
            <input 
              type="date" 
              id="endDate" 
              name="endDate" 
              onInput={(e) => handleEndDateInput(e, dispatch)}
            /> 
        </div> <br />
        <input 
          type="submit" 
          id="submit"
          className={styles["submit-button"]} 
          value="Reload Data"
          onClick={(e) => handleSubmit(e, dispatch)}
        />
      </form> <br /><br />
    </React.Fragment>
  )
}

export default Form