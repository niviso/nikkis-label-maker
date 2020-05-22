import React from 'react';
import './app.scss';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import ReactPDF,{ PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';
import ImageUploading from 'react-images-uploading';
// Create styles
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
    <Image src="data:image/jpeg;base64,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"/>
  </View>
  );
}


const MyDocument = () => {

  let Labels = [];

  for(let i=0;i<24;i++){
    Labels.push(<Label id={i}/>)
  }

  return(
  <Document>
    <Page size="A4" style={styles.page}>
    {Labels}
    </Page>
  </Document>
);

}

const Preview = () => (
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


function App() {
  
  const maxNumber = 69;
  const onChange = imageList => {
    // data for submit
    console.log(imageList[0].dataURL);
  };
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
            <div key={image.key} className="image-item">
              <img src={image.dataURL} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <button
                  onClick={() => {
                    image.onUpdate();
                  }}
                >
                  Update
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
