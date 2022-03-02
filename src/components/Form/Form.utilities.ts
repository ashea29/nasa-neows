import { AppDispatch } from '../../state/store'

export const handleStartDateInput = (e: any, dispatch: AppDispatch) => {
    e.preventDefault()
    import('validator')
      .then((module) => {
        console.log(e.target.value)
        // dateParams.usd = module.default.escape(e.target.value).trim()
        // console.log(dateParams)
      })
}

export const handleEndDateInput = (e: any, dispatch: AppDispatch) => {
  const endDateInput = document.getElementById('endDate')
    e.preventDefault()
    import('validator')
      .then((module) => {
        console.log(e.target.value)
        // dateParams.ued = module.default.escape(e.target.value).trim()
        // console.log(dateParams)
      })
}

export const handleSubmit = (e: any, dispatch: AppDispatch) => {
  e.preventDefault()
}