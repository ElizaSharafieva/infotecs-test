import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import useClosePopup from '../hooks/useClosePopup'

const Popup = (props) => {

  const {
    user, 
    isOpen, 
    setIsPopupOpen, 
    setSelectedUser
  } = props

  const { popupRef, buttonRef } = useClosePopup(() => closePopup())

  const closePopup = () => {
    setIsPopupOpen(false)
    setSelectedUser(null)
  }

  return (
    <div className={`${styles.popup} ${isOpen ? styles.popup_opened : ''}`}>
      <div className={styles.popup__container} ref={popupRef}>
        <ul>
          <li><span className={styles.popup__label}>ФИО: </span>{user.firstName} {user.lastName}</li>
          <li><span className={styles.popup__label}>Возраст: </span>{user.age}</li>
          <li><span className={styles.popup__label}>Адрес: </span>{user.address.city}, {user.address.address}</li>
          <li><span className={styles.popup__label}>Рост: </span>{user.height}</li>
          <li><span className={styles.popup__label}>Вес: </span>{user.weight}</li>
          <li><span className={styles.popup__label}>Номер: </span>{user.phone}</li>
          <li><span className={styles.popup__label}>Email: </span>{user.email}</li>
        </ul>
        <button 
          type="button" 
          className={styles.popup__button}
          ref={buttonRef}
          onClick={closePopup}
        >
      </button>
      </div>
    </div>
  )
}

Popup.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
}

export default Popup