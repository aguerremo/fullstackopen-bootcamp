import { forwardRef ,useState, useImperativeHandle } from 'react'

const Togglable = forwardRef(({children, buttonToShow, buttonToHide}, ref) => {
    const [visible, setVisible] = useState(null)
  
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisible = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
      return {
        toggleVisible
      }
    })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{buttonToShow}</button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>{buttonToHide}</button>
      </div>
    </div>
  )
})

export default Togglable