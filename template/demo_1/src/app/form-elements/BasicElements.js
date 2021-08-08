import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import axios from "axios"

export class BasicElements extends Component {
  state = {
    startDate: new Date(),
    category: [],
    subcategory: [],
    file: ''
  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()
  }

  render() {

    console.log("connected");
    window.addEventListener("load", () => {
      
      console.log("loaded");
      document.getElementById("catBtn").addEventListener("click", () => {
        console.log("new cat added");
        const cat = document.getElementById("categoryName").value
        console.log(cat);
        axios({
          url: "http://localhost:3003/postcategory",
          method: "POST",
          data: {
            cat: cat
          }
        })
      })
      document.getElementById("subcatBtn").addEventListener("click", () => {
        console.log("new cat added");
        const cat = document.getElementById("subcategoryName").value
        console.log(cat);
        axios({
          url: "http://localhost:3003/postsubcategory",
          method: "POST",
          data: {
            cat: cat
          }
        })
      })
      document.getElementById("postProduct").addEventListener("click", () => {
        console.log("Posting....!!");
        console.log(document.getElementById("files").files[0]);
        axios({
          url: "http://localhost:3003/postnewproduct",
          method: "POST",
          data: {
            files: document.getElementById("files").files[0]
          }
        })
      })
      document.getElementsByTagName("a")[1].addEventListener("click", () => {
        console.log("clicked");
      })
    })

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Form elements </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Forms</a></li>
              <li className="breadcrumb-item active" aria-current="page">Form elements</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            
          </div>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Upload A Product</h4>
                <form className="forms-sample">
                  <Form.Group>

                    <Form.Control name="productName" type="text" className="form-control" id="name" placeholder="Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="price">Price</label>
                    <Form.Control type="text" name="price" className="form-control" id="price" placeholder="Email" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="saleprice">Sale Price</label>
                    <Form.Control type="password" name="sprice" className="form-control" id="saleprice" placeholder="Password" />
                    </Form.Group>
                    <Form.Group>

                  </Form.Group>
                  <Form.Group>
                    
                  </Form.Group>
                  <Form.Group>
                    <label>Files upload</label>
                    <input type="file" id="files" className="form-control visibility-hidden" multiple onChange={this.onChange} />
                    {/* <div className="custom-file"> */}
                      {/* <input type="file" multiple className="" id="files" lang="es"/>
                      <input type="file" className="form-control" id="files" /> */}
                      {/* <label className="custom-file-label" htmlFor="customFileLang">Upload image</label> */}
                    {/* </div> */}
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="color">Color</label>
                    <Form.Control type="text" className="form-control" id="color" placeholder="Location" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="description">Product Description</label>
                    <textarea className="form-control" id="description" rows="4"></textarea>
                  </Form.Group>
                  {/* <button id="postProduct" className="btn btn-primary mr-2">Submit</button> */}
                  {/* <a id="postProduct" className="btn btn-primary mr-2">Submit</a> */}
                  <a id="postProduct" className="btn">Submit</a>
                  <button className="btn btn-dark">Cancel</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Horizontal Two column</h4>
                <form className="form-sample">
                  <p className="card-description"> Personal info </p>
                  <div className="row">
                    <div className="col-md-6">
                    <Form.Group>
                    <label htmlFor="category">Category</label>
                    <Form.Control type="text" name="category" className="form-control" id="categoryName" placeholder="category" />
                  </Form.Group>
                    </div>
                    </div>
                  
                  
                  <div className="row">
                      <a id="catBtn" className="btn btn-dark">Add Category</a>
                    
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Horizontal Two column</h4>
                <form className="form-sample">
                  <p className="card-description"> Personal info </p>
                  <div className="row">
                    <div className="col-md-6">
                    <Form.Group>
                    <label htmlFor="category">Sub Category</label>
                    <Form.Control type="text" name="sub-category" className="form-control" id="subcategoryName" placeholder="Sub Category" />
                  </Form.Group>
                    </div>
                    </div>
                  
                  
                  <div className="row">
                      <a id="subcatBtn" className="btn btn-dark">Add Sub Category</a>
                    
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BasicElements
