import React, { Component } from 'react';

// import from '../actions/index';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


export default class Cell extends Component{
  constructor(props){
    super(props);
    this.state = {
      color: 'dead'
    };
    this.test = this.test.bind(this);
  }

  test(){
    this.state.color === 'dead' ? this.setState({color:'alive'}) : this.setState({color:'dead'})
  }

  render(){
    return (
      <td
        className={this.state.color} 
        key={this.props.cellID}
        id={this.props.cellID}
        onClick={this.test}>
      </td>
    )
  }
}

// function mapDispatchToProps(dispatch){
//   return bindActionCreators({addRecipe}, dispatch)
// }

// export default connect(null,mapDispatchToProps)(AddRecipeButton)