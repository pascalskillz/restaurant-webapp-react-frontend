import React, { Component } from 'react';
import API from '../utils/API';

class Test extends Component {
  state = {
    dataArray: []
  };

  componentDidMount() {
    this.getData();
    this.getOneMenuItem(1);
  }

  getData = () => {
    API
    .getCategories()
    .then(res => {
      console.log(res.data);
      this.setState({
        dataArray: [...res.data]
      });
    });
  };


  getOneMenuItem = (id) => {
    API
      .getOneMenuItem(id)
      .then( res => {
        console.log(res.data)
      })
  }

  render() {
    return (
      <div>

        {
          this.state.dataArray.map((item, index) => (
            <div key={index}>
              {item.categoryName}
            </div>
          ))
        }

      </div>
    );
  }
}

export default Test;