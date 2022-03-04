import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import validator from 'validator'

import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { loadTableData } from '../../state/thunks'
import { selectDateParams } from '../../state/Entities/Table/table'

import styles from './DateForm.module.scss'


const Schema = yup.object().shape({
  startDate: yup.string(),
  endDate: yup.string()
})


const DateForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const dateParams = useAppSelector(selectDateParams)

  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    validationSchema: Schema,
    onSubmit: async (data, { setSubmitting, resetForm }) => {
      const sanitizedData = {
        startDate: validator.escape(data.startDate).trim(),
        endDate: validator.escape(data.endDate).trim(),
      }
      setSubmitting(true)
      await dispatch(loadTableData({
        ...dateParams, 
        userStartDate: sanitizedData.startDate,
        userEndDate: sanitizedData.endDate
      }))
      setSubmitting(false)
      resetForm()
    },
  })

  return (
    <React.Fragment>
      <form id='form' className={`flex-row ${styles.form}`} onSubmit={formik.handleSubmit}>
        <div className={styles["form-group"]} id="fg-start">
          <label>Start Date:</label> <br />
          <input 
            type="date" 
            id="startDate" 
            name="startDate"
            onChange={formik.handleChange} 
          />
        </div> <br />
        <div className={styles["form-group"]} id="fg-end">
          <label>End Date:</label> <br />
          <input 
            type="date" 
            id="endDate" 
            name="endDate" 
            onChange={formik.handleChange}
          /> 
        </div> <br />
        <button
          type="submit" 
          id="submit"
          className={styles["submit-button"]} 
        >
          GET DATA  
        </button>
      </form> <br /><br />
    </React.Fragment>
  )
}

export default DateForm