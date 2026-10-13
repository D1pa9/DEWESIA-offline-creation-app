import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally no logging of user content.
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="dw-error-boundary">
          <h2>{'Something didn\u2019t work as expected.'}</h2>
          <p>DEWESIA ran into a problem creating that result. Your content was not sent anywhere.</p>
          <button className="dw-primary-btn" onClick={this.handleReset}>Start Over</button>
        </div>
      );
    }
    return this.props.children;
  }
}
