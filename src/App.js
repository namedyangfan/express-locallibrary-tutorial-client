import React, { Component } from 'react';
import AuthorTable from './components/authorTable'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors     : null,
      isLoading   : true,
    };
  }

  render() {
    return (
      <div>
        <AuthorTable/>
      </div>
    )
  }
}

export default App;
