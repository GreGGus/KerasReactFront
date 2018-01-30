import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUploader from 'react-images-upload';
import axios from 'axios';


class App extends Component {

  constructor(props){
  		super(props);
  		 this.state = { pictures: [] };
  		 this.onDrop = this.onDrop.bind(this);

  }
  onDrop(picture) {
  console.log("POST PICTURE")
  const url = "http://176.31.251.185:5000"
              axios.post(url, picture, {
                headers: {
                  'Content-Type': picture.type
                }
              });
  		this.setState({
              pictures: this.state.pictures.concat(picture),
          });
  	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Keras DeepLearing Picture</h1>
        </header>
          <ImageUploader
                        	withIcon={true}
                        	buttonText='Choose images'
                        	onChange={this.onDrop}
                        	imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        	maxFileSize={5242880}
                    />
        <p className="App-intro">
          Upload picture to try
        </p>
      </div>
    );
  }
}

export default App;
