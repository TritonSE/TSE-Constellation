import { Button, Label, Input } from '../';
import { IconTest } from './IconTest';
import styles from './styles.css';

function App() {
  return (<>
    <div style={{
      width: '100vw',
      textAlign: 'center',
      padding: '10rem 0',
      color: 'var(--color-primary-light)',
      background: 'var(--color-primary-dark)',
    }}>
      <img src='/bulb.png' alt='TSE Logo' width={64} height={64} />
      <h1>TSE Constellation</h1>
      <p>A unified design system for Triton Software Engineering.</p>
    </div>
    <IconTest />
  </>);
}

export default App;
