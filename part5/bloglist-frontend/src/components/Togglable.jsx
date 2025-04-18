import { useState } from 'react'

export default function Togglable ({children, buttonToShow, buttonToHide}) {
    const [visible, setVisible] = useState(null)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{buttonToShow}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>{buttonToHide}</button>
      </div>
    </div>
  )
}