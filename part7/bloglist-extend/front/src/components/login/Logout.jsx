import { Button } from '../style/Button'
import { Paragraph } from '../style/Text'

export const Logout = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <Paragraph>
      {user.name} has been logged <br />
      <Button onClick={handleLogout}>Logout</Button>
    </Paragraph>
  )
}
