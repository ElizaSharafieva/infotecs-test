import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import UserTable from '../UserTable/UserTable'
import Popup from '../Popup/Popup'
import SearchForm from '../SearchForm/SearchForm'
import api from '../../utils/api'

function App() {

  const [users, setUsers] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async () => {
    try {
      const data = await api.get(`https://dummyjson.com/users`)
      return data.users
    } catch (error) {
      throw new Error('Ошибка при загрузке пользователей')
    }
  }

  useEffect (() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <main className={styles.main}>
      <SearchForm />
      <UserTable 
        users={users}
        setIsPopupOpen={setIsPopupOpen}
        setSelectedUser={setSelectedUser}
      />
      {
        isPopupOpen && 
        <Popup 
          user={selectedUser}
          isOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          setSelectedUser={setSelectedUser}
        />
      }
    </main>
  )
}

export default App
