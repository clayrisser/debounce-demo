import '@babel/polyfill';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import DebouncedInput from './components/DebouncedInput';

const logger = console;

@autobind
export default class App extends Component {
  state = {
    asyncResult: '',
    typing: false,
    value: '',
    working: false
  };

  handleChange(value) {
    this.setState({ value });
  }

  handleTypingStart(value) {
    this.setState({ typing: true, working: true });
    logger.info('typing-start', value);
  }

  handleTypingFinish(value) {
    this.setState({ typing: false, working: true }, () => {
      logger.info('typing-finish', value);
      this.asyncWork();
    });
  }

  async asyncWork() {
    const asyncResult = await this.reverse(this.state.value);
    this.setState({ asyncResult, working: this.state.typing });
  }

  async reverse(str) {
    await new Promise(r => setTimeout(r, (Math.random() + 1) * 1000));
    return str
      .split('')
      .reverse()
      .join('');
  }

  render() {
    return (
      <div>
        <h1>Debounce Demo</h1>
        <DebouncedInput
          onChange={this.handleChange}
          onTypingFinish={this.handleTypingFinish}
          onTypingStart={this.handleTypingStart}
          value={this.state.value}
        />
        <p>Typing: {this.state.typing.toString()}</p>
        <p>Working: {this.state.working.toString()}</p>
        <p>Async Result: {this.state.asyncResult}</p>
      </div>
    );
  }
}
