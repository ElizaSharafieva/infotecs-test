import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const UserTable = (props) => {

  const { 
    users,
    setIsPopupOpen,
    setSelectedUser
  } = props

  function handleClick(user) {
    setIsPopupOpen(true)
    setSelectedUser(user)
  } 

  const columns = [
    { header: 'ФИО'},
    { header: 'Возраст'},
    { header: 'Пол'},
    { header: 'Номер телефона'},
    { header: 'Адрес'},
  ]

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {
            columns.map((item, index) => (
              <th key={index} className={styles.table__subtitle}>{item.header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          users.map((user) => (
            <tr key={user.id} className={styles.table__row} onClick={() => handleClick(user)}>
              <td className={styles.table__data}>{user.firstName} {user.lastName}</td>
              <td className={styles.table__data}>{user.age}</td>
              <td className={styles.table__data}>{user.gender}</td>
              <td className={styles.table__data}>{user.phone}</td>
              <td className={styles.table__data}>{user.address.city}, {user.address.address}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      gender: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
}

export default UserTable