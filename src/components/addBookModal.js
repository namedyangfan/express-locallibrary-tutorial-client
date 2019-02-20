import React, { Component } from 'react';
import * as book_api from '.././api/book'
import Portal from './portal'
import M from 'materialize-css';

export default class AddBookModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: '',
      isbn: '',
      summary: '',
      createBookError: null,
      books: null,
      selectedBook: null
    };
  }

  componentDidMount(){
    M.Dropdown.init(this.dropDown);

    this.getBooks()
  }


  getBooks=()=>{
    book_api.get()
      .then((res)=>{
        console.log('GET BOOKS SUCCEED')
        console.log(res.data)
        this.setState({ books: res.data.list_books})
      })
      .catch((e) =>{
        console.log('GET BOOK FAILD')
        console.log(e.response.data.errors)
      })
  }

  createBook=()=>{
    const params = {
      'title'   : this.state.title,
      'isbn'    : this.state.isbn,
      'summary' : this.state.summary,
      'author'  : this.props.author._id,
      'book'    : this.state.selectedBook,
    }
    console.log('params:')
    console.log(params)

    if(params.book){
      book_api.addAuthor(params)
      .then((res) => {
        console.log('ADD AUTHOR SUCCEED')
        console.log(res.data)
        this.props.toggleModal()
        this.props.getAuthors()
      })
      .catch((e) =>{
        console.log('ADD AUTHOR FAILD')
        console.log(e.response.data.errors)
        this.setState({createBookError : e.response.data.errors})
      })
    } else{
      console.log(params)
      book_api.post(params)
      .then((res) => {
        console.log('CREATE BOOK SUCCEED')
        console.log(res.data)
        this.props.toggleModal()
        this.props.getAuthors()
      })
      .catch((e) =>{
        console.log('CREATE BOOK FAILD')
        console.log(e.response.data.errors)
        this.setState({createBookError : e.response.data.errors})
      })
    }
  }

  updateBook=(e)=>{
    this.setState( {[e.target.name] : e.target.value}, console.log(this.state) )
  }

  selectBook=(book)=>{
    console.log(book)
    this.setState({
      'title'   : book.title,
      'isbn'    : book.isbn,
      'summary' : book.summary,
      'selectedBook' : book._id
    })
    M.updateTextFields();
  }

  renderDropDown=()=>{
    const books = this.state.books?(
      this.state.books.map((book, key)=>(<li key={key}><a onClick={()=> this.selectBook(book)}>{book.title}</a></li>))
    ):( null )

    return (
      <div>
        <a className='dropdown-trigger btn' data-target='dropdown1'  
        ref={ (dropDown) => {this.dropDown = dropDown}}>Select Book</a>

        <ul id='dropdown1' className='dropdown-content' >
          {books}
        </ul>
      </div>
    )
  }

  render(){
    const createBookError = this.state.createBookError
    return(
      <Portal>
        <div className="potal-container">
            <div className="modal-content">
                <div className="row">
                  {this.renderDropDown()}
                </div>
                <div className="divider"></div>
                <div className="row">
                  <div className="input-field col s6">
                    <input id="title" type="text" className="validate" onChange={this.updateBook}
                      value={this.state.title} name='title' placeholder=""/>
                    <label for="title">Book Title</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="isbn" type="text" className="validate" onChange={this.updateBook}
                      value={this.state.isbn} name='isbn' placeholder=""/>
                    <label for="isbn">ISBN</label>
                  </div>
                  <div className="input-field col s12">
                    <input id="summary" type="text" className="validate" onChange={this.updateBook}
                      value={this.state.summary} name='summary' placeholder=""/>
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
                  <a className='modal-close waves-effect waves-red btn' onClick={this.props.toggleModal}>Close</a>
                </div>
              </div>
            </div>
        </div>
      </Portal>
    )

  }

}