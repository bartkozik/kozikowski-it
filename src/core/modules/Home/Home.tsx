import styles from './Home.module.scss';

export function Home() {
  return (
    <main className={styles.home}>
      <p className={styles.label}>Portfolio</p>
      <h1>Bartosz Kozikowski</h1>
      <p>Fullstack developer building web applications.</p>
      <a href="https://github.com/bartkozik">Explore my GitHub</a>
    </main>
  );
}
