import React,{useContext,useEffect,useState} from 'react';
import './app.scss';
import { AppContext } from "../../context/appContext";
import Preview from '../../components/preview/preview';
import ImageSelector from '../../components/imageSelector/imageSelector';
// Create styles



function App() {
  const [state,setState] = useContext(AppContext);
  const [showPreview,setShowPreview] = useState(true);



  const UpdateRows = (e) => {
    setShowPreview(false);
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.rows = e.target.value
    setState(tmp);
    setTimeout(x=>{
      setShowPreview(true);
    },1);
  }

  const UpdateColumns = (e) => {
    setShowPreview(false);
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.columns = e.target.value
    setState(tmp);
    setTimeout(x=>{
      setShowPreview(true);
    },1);
  }

  return (
    <div className="App">
    {showPreview && <div style={{position: 'absolute',top:0,right: 0}}> <Preview state={state}/></div> }
    <div className="ImageSelector">
      <ImageSelector setShowPreview={setShowPreview}/>
    </div>
    <div className="InputWrapper">
    Rows:<input type="number" min="1" max="10" onChange={UpdateRows} value={state.rows}/>
    Columns:<input type="number" min="1" max="10" onChange={UpdateColumns} value={state.columns}/>
    </div>



    </div>
  );
}

export default App;
