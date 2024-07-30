import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import api from '../../utils/api'

const SearchForm = ( {allUsers, setFilteredUsers} ) => {

  const [value, setValue] = useState('')

  function handleChangeValue(evt) {
    setValue(evt.target.value)
    if(!evt.target.value) setFilteredUsers(allUsers)
  }

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{1,4})(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      const [, countryCode, areaCode, firstPart, secondPart] = match
      return encodeURIComponent(`+${countryCode} ${areaCode}-${firstPart}-${secondPart}`)
    }
    return phoneNumber
  }

  const capitalizeWords = (str) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const fetchUsersByKey = async (key, value) => {
    try {
      const data = await api.get(`https://dummyjson.com/users/filter?key=${key}&value=${value}`)
      return data.users
    } catch (error) {
      console.error(`Ошибка при фильтрации пользователей по ключу ${key}:`, error)
      return []
    }
  }

  const fetchFilteredUsers = async (query) => {

    let searchValue = query.trim()
  
    const keys = {
      firstName: capitalizeWords(searchValue),
      'address.city': capitalizeWords(searchValue),
      phone: formatPhoneNumber(searchValue),
      age: searchValue,
    }
  
    const promises = Object.entries(keys).map(([key, value]) => fetchUsersByKey(key, value))
  
    try {
      const results = await Promise.all(promises)
      const combinedResults = results.flat()

      if (combinedResults.length > 0) {
        console.log('Найденные пользователи:', combinedResults)
        return combinedResults
      } else {
        console.log('Пользователи не найдены')
        return []
      }
    } catch (error) {
      console.error('Ошибка при фильтрации пользователей', error)
      return ['']
    }
  }

  function handleSearchUser(evt) {
    evt.preventDefault()
    if (value)
      fetchFilteredUsers(value)
        .then (users => setFilteredUsers(users))
        .catch(err => console.log(err))
  }

  function clearInput() {
    setValue('')
    setFilteredUsers(allUsers)
  }

  return (
    <form className={styles.form} type='submit'>
      <div className={styles.form__inputContainer}>
        <input 
          className={styles.form__input}  
          id="search-input" 
          onChange={handleChangeValue}
          placeholder='Введите имя, возраст, номер телефона или город'
          value={value}
        />
        {value && <button type="button" className={styles.form__button_del} onClick={clearInput}>&#10006;</button>}
      </div>
      <button className={styles.form__button} onClick={handleSearchUser}></button>
    </form>
  )
}

SearchForm.propTypes = {
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
  setFilteredUsers: PropTypes.func.isRequired,
}

export default SearchForm