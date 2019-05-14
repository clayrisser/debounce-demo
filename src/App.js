import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import Input from './components/Input';

@autobind
export default class App extends Component {
  state = {
    value: ''
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Input onChange={this.handleChange} value={value} />
        <p>{value}</p>
      </div>
    );
  }
}
