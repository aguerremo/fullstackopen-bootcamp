import { forwardRef ,useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonToShow = 'more info', buttonToHide='close' }, ref) => {
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

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonToShow: PropTypes.string.isRequired,
  buttonToHide: PropTypes.string.isRequired
}

export default Togglable