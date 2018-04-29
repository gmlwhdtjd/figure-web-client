import React, { Component } from 'react'; 
import Popup from 'react-popup';
import './App.css';
import Item from './Item.js'

class App extends Component {

  state = {};

  componentDidMount() {
    this._getItems();
  }

  _getItems = () => {
    this._callApi()
    .then(res => this.setState({ itemList: res.items}))
    .catch(err => console.log(err));
  }

  _callApi = async () => {
    const response = await fetch('http://gmlwhdtjd.iptime.org:5000/api/itemList');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  _renderItems = () => {
    const itemList = this.state.itemList.map(item => {
      return <Item 
        brandName={item.brandName} 
        itemId={item.itemId} 
        itemImage={item.itemImage} 
        qrList={item.qrList} 
        key={item._id} 
      />
    })
    
    return itemList;
  }

  render() {
    return (
      <div className={this.state ? "App" : "App--loading"}>
        <Popup />
        <header className="App-header">
          <h1 className="App-title">FigURe Demo</h1>
        </header>
        {this.state.itemList ? this._renderItems() : "Loading"}
      </div>
    );
  }
}

export default App;
