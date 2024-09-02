import { Link } from 'react-router-dom';
import styles from './About.module.css'
import Logo from '../components/Logo';
// import PageNav from '../components/PageNav'
function About() {
    return (
        <main className={styles.about}>
            <Link to ="/"> <Logo/> </Link>
            <section>
                <div>
                <h2>About Post-IT</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia orci at ipsum feugiat, non vehicula lorem interdum. Nullam vehicula eros non nisi fringilla, in fermentum metus sollicitudin. Fusce interdum, ligula ac bibendum pharetra, metus arcu auctor ligula, vel consectetur sem justo et lorem. Donec vel purus non eros dictum malesuada. Integer ultricies sapien non eros tristique, vitae scelerisque orci imperdiet.
                </p>
                </div>
            </section>
        </main>
    );
}

export default About;
