import styles from './styles.module.scss'

const SearchForm = (props) => {
  return (
    <form className={styles.form} type='submit'>
      <input className={styles.form__input}></input>
      <button className={styles.form__button}></button>
    </form>
  )
}

export default SearchForm