import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import Loadable from 'react-loading-overlay'

class App extends Component {

  constructor(props){
  		super(props);
  		 this.state = { firstTry:true, pictures: [] ,results:null,response:null,isActive:false};
  		 this.onDrop = this.onDrop.bind(this);
  		 this.changeModal = this.changeModal.bind(this);
         }

  onDrop(picture) {
      const url = "http://176.31.251.185:5000/predict"
        let data = new FormData();
        var self = this;
        for (var i = 0; i < picture.length; i++) {
                let file = picture.item(i);
                data.append('image', file, file.name);
            }
         axios.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}
                  }).then(response => {
                      console.log('Success', response);
                      self.changeModal(response)
                    }).catch(error => {
                      console.log('Error', error);
                      self.setState({isActive:false})

                    });
            let newPictures=[]
            newPictures.concat(picture)
            self.changePicture(newPictures)
  	}

   changeModal(response){
                this.setState({
                          isActive:false,
                          results:response.data,
                          firstTry:false
           })
   }

  changePicture(newPictures){
  	this.setState({
                pictures: newPictures,
                isActive:true
            });
  }

  render() {

  const {firstTry,isActive,results} = this.state
    return (
              <Loadable

                    active={isActive}
                    spinner
                    animate
                    zIndex={1000}
                    text='Processing image'
                    >
                  <div className="App">
                                <header className="App-header">
                                  <img src={logo} className="App-logo" alt="logo" />
                                  <h1 className="App-title">Keras DeepLearing Image</h1>
                                </header>
                                <ImageUploader
                                                buttonText='Choose images'
                                                onChange={this.onDrop}
                                                imgExtension={['.jpg','.png']}
                                                maxFileSize={52428800}
                                        />
                                 { firstTry ? <p className="App-intro"> Upload picture to try</p> : ""}
                                 { !firstTry ? (results.predictions.map(result => <ResultItem result={result} />)) : ""}

                  </div>
              </Loadable>
    );
  }
}

const ResultItem = (result) => <p>  <div> {result.result.label} :   {Math.round(result.result.probability * 100 )} % </div> </p>


export default App;
