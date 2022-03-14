// import styles from './styles.modules.css'
import Meme from '../Meme/Meme';
import GeneratedMeme from '../GeneratedMeme/GeneratedMeme';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Meme Generator</h1>
      <Switch>
        <Route exact path="/">
          <Meme />
        </Route>
        <Route path="/generated">
          <GeneratedMeme />
        </Route>
        <Route path="*">
          <Meme />
      </Route>
      </Switch>
    </>
  );
}

export default App;
