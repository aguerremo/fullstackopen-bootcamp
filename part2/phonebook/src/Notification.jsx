
export const Notifications = ({message, errorMessage}) => {

   
    if (message === null & errorMessage === null) {
        return null
        
    } if (message !== null){
        return <div className="done">
        {message}
    </div>
    } if (errorMessage !== null)
        return <div className="error">
        {errorMessage}
    </div>
    }
    
    

