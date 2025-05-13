import { useSelector } from 'react-redux'

export const Notifications = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}
