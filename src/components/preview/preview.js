import React,{useContext,useEffect,useState} from 'react';
import { Page, Text, View, Document, StyleSheet,Image } from '@react-pdf/renderer';
import ReactPDF,{ PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';
import ImageUploading from 'react-images-uploading';
import { AppContext } from "../../context/appContext";
import styles from './style.scss';

function Preview(props) {
  const {state} = props;


  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      flexWrap: "wrap"
    },
    labels: {
      width: (210/state.rows) + "mm",
      height: (297/state.columns)+"mm",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  const Label = (props) => {
    const {id,content} = props;
    return(
    <View style={styles.labels}>
    { state.image ? <Image src={state.image}/> : <Text>Item #{id}</Text> }
    </View>
    );
  }


  const MyDocument = (props) => {
    let Labels = [];

    for(let i=0;i<(state.rows*state.columns);i++){
      Labels.push(<Label key={i} id={i} />)
    }

    return(
    <Document>
      <Page size="A4" style={styles.page}>
      {Labels}
      </Page>
    </Document>
  );

  }


  return(
  <div className="Preview">
  <PDFViewer style={{width: "15vw",height: "25vw"}} scrolling="no">
    <MyDocument />
  </PDFViewer>
  <p>
  <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
   Download PDF
  </PDFDownloadLink>
  </p>
  </div>
)


}

export default Preview;
