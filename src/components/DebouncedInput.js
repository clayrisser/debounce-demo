import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import autobind from 'autobind-decorator';
import Input from './Input';

@autobind
export default class DebouncedInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onTypingFinish: PropTypes.func,
    onTypingStart: PropTypes.func,
    wait: PropTypes.number
  };

  static defaultProps = {
    onChange: f => f,
    onTypingFinish: f => f,
    onTypingStart: f => f,
    wait: 200
  };

  state = {
    value: ''
  };

  constructor(props) {
    super(props);
    this.debouncedHandleChange = _.debounce(
      this.debouncedHandleChange,
      this.props.wait
    );
  }

  debouncedHandleChange() {
    this.typing = false;
    this.props.onTypingFinish(this.state.value);
  }

  handleChange(e) {
    if (!this.typing) this.props.onTypingStart(this.state.value);
    this.typing = true;
    this.setState({ value: e.target.value }, () => {
      this.props.onChange(this.state.value);
      this.debouncedHandleChange();
    });
  }

  render() {
    const props = { ...this.props };
    delete props.onChange;
    delete props.onTypingFinish;
    delete props.onTypingStart;
    delete props.wait;
    return (
      <Input {...props} onChange={this.handleChange} value={this.state.value} />
    );
  }
}
