import { AppContext } from "../../context/appContext";
import ImageUploading from 'react-images-uploading';
import React,{useContext,useEffect,useState} from 'react';
import "./style.scss";
function ImageSelector(props){
  const [state,setState] = useContext(AppContext);
  const {setShowPreview,reload} = props;
  const onChange = imageList => {
    // data for submit
  //  console.log(imageList[0].dataURL);
  };


  const SelectImage = (image) =>{
    reload();
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.image = image.dataURL;
    setState(tmp);
  }
  return(
    <ImageUploading multiple onChange={onChange} maxNumber={100}>
      {({ imageList, onImageUpload, onImageRemoveAll }) => (
        // write your building UI
        <div className="UploadImageWrapper">
          <button onClick={onImageUpload}>Upload images</button>
          {imageList.length > 1 && <button onClick={onImageRemoveAll}>Remove all images</button>}
          <div>
          {imageList.map(image => (
            <div key={image.key} className="image-item" style={{border: image.dataURL == state.image ? '1px solid red' : '1px solid white'}}>
            <div style={{width: '80px',height: '45px',overflow: 'hidden'}}>
              <img src={image.dataURL} alt="" width="100%" />
              </div>
              <div className="Key">{image.key}</div>
              <div className="image-item__btn-wrapper">

                <button
                  onClick={() => {
                    SelectImage(image)
                  }}
                >
                  Select
                </button>
                <button onClick={image.onRemove}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </ImageUploading>
  )
}

export default ImageSelector;
