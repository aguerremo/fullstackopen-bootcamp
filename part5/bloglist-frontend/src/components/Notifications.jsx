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
        return <div className="done">
        {doneMessage}
        {removeDoneNotification()}
      </div>

   } if (errorMessage !== null) {

        return <div className="error">
        {errorMessage}
        {removeErrorNotification()}
      </div>
  }
}
