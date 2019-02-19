import React, { Component } from 'react';
import * as book_api from '.././api/book'
import Portal from './portal'

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

  createBook=()=>{
    const params = {
      'title'   : this.state.title,
      'isbn'    : this.state.isbn,
      'summary' : this.state.summary,
      'author'  : this.props.author._id
    }

    console.log(params)
    book_api.post(params)
      .then((res) => {
        console.log('CREATE BOOK SUCCEED')
        console.log(res.data)
        this.toggleModal()
        this.props.getAuthors()
      })
      .catch((e) =>{
        console.log('CREATE BOOK FAILD')
        console.log(e.response.data.errors)
        this.setState({createBookError : e.response.data.errors})
      })
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
    const createBookError = this.state.createBookError
    return(
      <div>
        <li><a className='btn' onClick={this.toggleModal}>add Book</a></li>
        {
          this.state.modal?
          (
            <Portal>
              <div className="potal-container">
                    <div className="modal-content">
                      <h4>Modal Header</h4>

                      <div className="row">
                        <div className="input-field col s6">
                          <input id="title" type="text" className="validate" onChange={this.updateBook}
                            value={this.state.title} name='title'/>
                          <label for="title">Book Title</label>
                        </div>
                        <div className="input-field col s6">
                          <input id="isbn" type="text" className="validate" onChange={this.updateBook}
                            value={this.state.isbn} name='isbn'/>
                          <label for="isbn">ISBN</label>
                        </div>
                        <div className="input-field col s12">
                          <input id="summary" type="text" className="validate" onChange={this.updateBook}
                            value={this.state.summary} name='summary'/>
                          <label for="summary">summary</label>
                        </div>
                        {
                          createBookError?(createBookError.map((error)=>(
                            <li className='red-text text-darken-3'>{error.msg}</li>))
                          ):(null)
                        }
                      </div>
                    <div className="row">
                      <div className="col s12 m2">
                        <a className='modal-close waves-effect waves-red btn' onClick={this.createBook}>Submit</a>
                      </div>
                      <div className="col s12 m2  offset-m1">
                        <a className='modal-close waves-effect waves-red btn' onClick={this.toggleModal}>Close</a>
                      </div>
                    </div>
                    </div>
              </div>
            </Portal>
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