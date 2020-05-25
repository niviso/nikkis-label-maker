import React,{useContext,useEffect,useState} from 'react';
import './app.scss';
import { AppContext } from "../../context/appContext";
import Preview from '../../components/preview/preview';
import ImageSelector from '../../components/imageSelector/imageSelector';
import Settings from '../../components/settings/settings';

// Create styles



function App() {
  const [state,setState] = useContext(AppContext);
  const [loading,setLoading] = useState(true);

  function reload() {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    },1000);
  }

  return (
    <div className="App">
    <div className="SettingsWrapper">
    <Settings reload={reload}/>
    </div>
  <div className="WorkArea">
  <ImageSelector reload={reload}/>
  <div style={{backgroundColor: 'white',display: 'flex',justifyContent:'center',alignItems:'center',overflow: 'hidden',width: (210/state.rows)+"mm", height: (297/state.columns)+"mm",border: "1px solid black"}}>
  {state.image ? <img src={state.image} height="100%" alt=""/> : <p>Item #x</p>}
  </div>

  </div>
  <div className="PreviewWrapper">
  {loading && <Preview state={state}/> }
  {!loading && <h1 style={{color: 'white'}}>Reloading preview</h1>}

  </div>
    </div>
  );
}

export default App;
