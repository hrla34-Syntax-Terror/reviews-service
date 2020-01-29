import React from 'react';
import ReviewsList from './ReviewsList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
      <div>Hello this is App</div>
      <ReviewsList />
      </div>
    )
  }
}

export default App;