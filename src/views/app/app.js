import React,{useContext,useEffect,useState} from 'react';
import './app.scss';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import ReactPDF,{ PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';
import ImageUploading from 'react-images-uploading';
import { AppContext } from "../../context/appContext";

// Create styles



function App() {
  const [state,setState] = useContext(AppContext);
  console.log(state);

  const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
  //  console.log(imageList[0].dataURL);
  };

  var selected = null;

  const SelectImage = (image) =>{
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.image = image.dataURL;
    setState(tmp);
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      flexWrap: "wrap"
    },
    labels: {
      width: "70mm",
      height: "37mm",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  // Create Document Component

  const Label = (props) => {
    const {id,content} = props;
    return(
    <View style={styles.labels}>
      <Image src={state.image}/>
    </View>
    );
  }


  const MyDocument = (props) => {
    let Labels = [];

    for(let i=0;i<24;i++){
      Labels.push(<Label id={i} />)
    }

    return(
    <Document>
      <Page size="A4" style={styles.page}>
      {Labels}
      </Page>
    </Document>
  );

  }

  const Preview = (props) => {

    return (
      <>
      <div style={{position:'absolute',right: 0,top:0}}>
      <PDFViewer style={{width: "15vw",height: "25vw"}} scrolling="no">
        <MyDocument />
      </PDFViewer>
      <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
        Download PDF
      </PDFDownloadLink>
      </div>
      </>
  );

  }




  return (
    <>
    <Preview/>

    <ImageUploading multiple onChange={onChange} maxNumber={maxNumber}>
      {({ imageList, onImageUpload, onImageRemoveAll }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button onClick={onImageUpload}>Upload images</button>&nbsp;
          <button onClick={onImageRemoveAll}>Remove all images</button>
          {imageList.map(image => (
            <div key={image.key} className="image-item" style={{border: image.dataURL == state.image ? '2px solid red' : null }}>
              <img src={image.dataURL} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <button
                  onClick={() => {
                    image.onUpdate();
                  }}
                >
                  Update
                </button>

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
      )}
    </ImageUploading>
    </>
  );
}

export default App;
