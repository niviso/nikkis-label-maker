import React,{useContext,useEffect,useState} from 'react';
import { AppContext } from "../../context/appContext";
import styles from './style.scss';



function Settings(props){
  const [state,setState] = useContext(AppContext);
  const {reload} = props;

  const UpdateRows = (e) => {
    reload();
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.rows = e.target.value
    setState(tmp);
  }

  const UpdateColumns = (e) => {
    reload();
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.columns = e.target.value
    setState(tmp);
  }

  return(
    <div className="Settings">
    <div className="SettingsHeader">
      Settings
    </div>

    <div className="Wrapper">
    <label>Rows<input type="number" min="1" max="10" onChange={UpdateRows} value={state.rows}/></label>
    <div className="Separator-y"/>
    <label>Columns<input type="number" min="1" max="10" onChange={UpdateColumns} value={state.columns}/></label>
    <div className="Separator-y"/>
    <label className="Row">
      <div className="CheckBoxWrapper">
        <input type="checkbox"/>
      </div>
      <p className="Row">Index number on each label</p>
    </label>


    </div>
    </div>
  )

}

export default Settings;
