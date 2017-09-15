import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCategories } from '../utils/api'
import { addCategories } from '../actions'

import '../App.css';

class App extends Component {
  componentDidMount() {
    getCategories().then((categories) => {
      console.log("categories", categories)
      this.props.addCategories(categories)
    })
  }

  render() {
    const { categories } = this.props
    console.log("b", categories)

    return (
      <div className="App">
          <div className="categoreis" >
            {categories.map((cat) =>  <li key={cat.path}>{cat.name}</li>)}
          </div>
      </div>
    );
  }
}

function mapStateToProps(category) {
  return {
    categories: category.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategories: (data) => dispatch(addCategories(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
