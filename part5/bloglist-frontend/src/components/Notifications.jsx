
export const Notifications = ({doneMessage, errorMessage}) => {

   
  if (doneMessage === null & errorMessage === null) {
      return null
      
  } if (doneMessage !== null){
      return <div className="done">
      {doneMessage}
  </div>
  } if (errorMessage !== null)
      return <div className="error">
      {errorMessage}
  </div>
  }

