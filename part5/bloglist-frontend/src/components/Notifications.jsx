

export const Notifications = ({doneMessage, errorMessage, setErrorMessage, setDoneMessage}) => {

  const removeDoneNotification = () => {
    setTimeout(() => {
      setDoneMessage(null) 
    }, 3000);
  }
  
  const removeErrorNotification = () => {
    setTimeout(() => {
      setErrorMessage(null) 
    }, 3000);
  } 
  if (doneMessage === null & errorMessage === null) {
    
    return null
      
    } if (doneMessage !== null) {
      removeDoneNotification()
        return <div className="done">
        {doneMessage}
      </div>

   } if (errorMessage !== null)

      removeErrorNotification()

        return <div className="error">
        {errorMessage}
      </div>
  }

