import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import useResizableColumns from '../../hooks/useResizableColumns'

const UserTable = (props) => {

  const { 
    allUsers,
    filteredUsers,
    setFilteredUsers,
    setIsPopupOpen,
    setSelectedUser
  } = props

  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: null})
  const tableRef = useRef(null)
  useResizableColumns(tableRef, styles)

  function handleClick(user) {
    setIsPopupOpen(true)
    setSelectedUser(user)
  } 

  function handleSort(key) {

    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' 
      : sortConfig.key === key && sortConfig.direction === 'desc' ? null 
      : 'asc'
    setSortConfig({ key, direction: newDirection })

    if (newDirection !== null) {
      const sortedArray = [...filteredUsers].sort((a, b) => {
        let aValue = a[key]
        let bValue = b[key]

        if (key === 'name') {
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase()
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase()
        } else if (key === 'address') {
          aValue = `${a.address.city} ${a.address.address}`.toLowerCase()
          bValue = `${b.address.city} ${b.address.address}`.toLowerCase()
        }

        if (aValue < bValue) return newDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return newDirection === 'asc' ? 1 : -1
        return 0
      })
      setFilteredUsers(sortedArray)
    } else {
      setFilteredUsers(allUsers)
    }
  }
  
  const columns = [
    { key: 'name', header: 'ФИО'},
    { key: 'age', header: 'Возраст'},
    { key: 'gender', header: 'Пол'},
    { key: 'phone', header: 'Номер телефона'},
    { key: 'address', header: 'Адрес'},
  ]

  return (
    <table className={styles.table} ref={tableRef}>
      <thead>
        <tr>
          {
            columns.map((item, index) => (
              <th key={index} className={styles.table__subtitle}>
                <div className={styles.table__headerContainer}>
                  <h3>{item.header}</h3>
                  <button 
                    type="button" 
                    className={`${styles.table__button} 
                    ${sortConfig.key === item.key ? 
                      sortConfig.direction === null ? '' 
                      : sortConfig.direction === 'asc' ? styles.table__button_asc 
                      : styles.table__button_desc 
                      : ''}`}
                    onClick={() => handleSort((item.key))}
                  ></button>
                </div>
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        { 
          filteredUsers.length > 0 ? 
          filteredUsers.map((user) => (
            <tr key={user.id} className={styles.table__row} onClick={() => handleClick(user)}>
              <td className={styles.table__data}>{user.firstName} {user.lastName}</td>
              <td className={styles.table__data}>{user.age}</td>
              <td className={styles.table__data}>{user.gender}</td>
              <td className={styles.table__data}>{user.phone}</td>
              <td className={styles.table__data}>{user.address.city}, {user.address.address}</td>
            </tr>
          ))
          :
          <tr><td className={styles.table__data_error} colSpan={columns.length}>Пользователи не найдены</td></tr>
        }
      </tbody>
    </table>
  )
}

UserTable.propTypes = {
  allUsers: PropTypes.arrayOf(
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
  filteredUsers: PropTypes.arrayOf(
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
  setFilteredUsers: PropTypes.func.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
}

export default UserTable