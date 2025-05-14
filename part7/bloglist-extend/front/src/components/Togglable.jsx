import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from './style/Button'

const Togglable = forwardRef(
  ({ children, buttonToShow = 'more info', buttonToHide = 'close' }, ref) => {
    const [visible, setVisible] = useState(null)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisible = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
      return {
        toggleVisible,
      }
    })

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={toggleVisible}>{buttonToShow}</Button>
        </div>

        <div style={showWhenVisible} className="togglableContent">
          {children}
          <Button onClick={toggleVisible}>{buttonToHide}</Button>
        </div>
      </div>
    )
  }
)

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonToShow: PropTypes.string.isRequired,
  buttonToHide: PropTypes.string.isRequired,
}

export default Togglable
