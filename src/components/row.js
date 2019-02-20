import React, { Component } from 'react';
import AddBookModal from './addBookModal'

export default class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      isbn: '',
      summary: '',
      createBookError: null
    };
  }

  updateBook=(e)=>{
    this.setState( {[e.target.name] : e.target.value}, console.log(this.state) )
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      createBookError: null
    }));
  }

  renderAddBookModal = () => {
    return(
      <div>
        <li><a className='btn' onClick={this.toggleModal}>add Book</a></li>
        {
          this.state.modal?
          (
            <AddBookModal author={this.props.author} toggleModal={this.toggleModal} 
            getAuthors={this.props.getAuthors}/>
          ):( null )
        }
      </div>
    )
  }

  render(){
    const author = this.props.author
    return(
      <tr>
        <td>{author.first_name}</td>
        <td>{author.family_name}</td>
        <td>
          <ul>
          {
            author.book.map((book, index)=>( 
              <li key={index}><a>{book.title}</a></li>
            )) 
          }
          {this.renderAddBookModal()}
          </ul>
        </td>
      </tr>
    )
  }
}