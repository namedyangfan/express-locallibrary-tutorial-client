import React, { Component } from 'react';
import * as author_api from '.././api/author'
import Row from './row'

export default class AuthorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors     : null,
      isLoading   : true,
      firstName   : '',
      familyName  : ''
    };
  }

  componentDidMount(){
    this.getAuthors()
  }

  updateAuthor=(e)=>{
      this.setState( {[e.target.name] : e.target.value}, console.log(this.state) )
  }

  getAuthors=()=>{

    author_api.get()
      .then((res) => {
        console.log('GET AUTHORS SUCCEED')
        console.log(res.data.list_authors)
        this.setState({
          authors:res.data.list_authors,
          isLoading:false
        })

      })
      .catch((error) => { console.log(error) })

  }

  addAuthor=()=>{
    const params = {
      'first_name'  : this.state.firstName,
      'family_name' : this.state.familyName
    }
    author_api.post(params)
    .then( (res) => {
      console.log(res)
      this.getAuthors()
    })
    .catch((error) => (console.log(error)))

  }
  render() {
    const authors = this.state.authors
    return (
      <div>
        {this.state.isLoading?(
          <div>Hello Fan</div>
          ):(
            <div>
              <table>
                <thead>
                  <tr>
                      <th>First Name</th>
                      <th>Family Name</th>
                      <th>Books</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    authors.map( (author, key) => 
                      <Row author={author} key={key} getAuthors={this.getAuthors}/> 
                    )
                  }
                  <tr>
                    <td>
                      <div className="input-field col s6">
                        <input id="firstName" type="text" className="validate" onChange={this.updateAuthor}
                          value={this.firstName} name='firstName'/>
                        <label for="firstName">First Name</label>
                      </div>
                    </td>
                    <td>
                      <div className="input-field col s6">
                        <input id="familyName" type="text" className="validate" onChange={this.updateAuthor}
                          value={this.familyName} name='familyName'/>
                        <label for="familyName">Family Name</label>
                      </div>
                    </td>
                    <td><a className='btn' onClick={this.addAuthor}>add Author</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    )
  }
}
