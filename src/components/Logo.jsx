import styles from './Logo.module.css'
function Logo() {
    return (
            <img 
            src = "/logo.png"
            alt = "logo postit"
            className={styles.logo}
             />            
    );
}

export default Logo
