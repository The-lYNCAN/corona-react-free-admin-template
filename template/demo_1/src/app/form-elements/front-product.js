import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [gallery, setGallery] = useState([]);
  const [filename, setFilename] = useState('Choose File For ThumbName');
  const [FileNames, setFilenames] = useState('Choose File For Gallery');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [category, setCategory] = useState([])
  const [subcategory, setSubCategory] = useState([])

  window.onload = () => {
    axios({
        url:"http://localhost:3003/api/categories",
        method: "GET"
      }).then(res => {
        console.log(res.data);
        // this.setState({category: res.data})
        setCategory(res.data)
        // console.log(this.state.category);
      })
      axios({
        url:"http://localhost:3003/api/subcategory",
        method: "GET"
      }).then(res => {
        console.log(res.data);
        setSubCategory(res.data)
        // this.setState({subcategory: res.data})
        // console.log(this.state.category);
      })
  }

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onGalChange = e => {
      console.log(e.target.files);
    setGallery(e.target.files);
    // setFilename(e.target.files[0].name);
    const galName = []
    // e.target.files.forEach(fipe => {
    // })
    console.log(e.target.files.length);
    for(var i=0;i<=e.target.files.length-1;i++){
        galName.push(e.target.files[i].name)
    }
    console.log(galName);
    setFilenames(galName)
  };

  const handleClick = () => {
      console.log("clicked");
  }

  const onSubmit = async e => {
    e.preventDefault();
    const name = document.getElementById("name").value
    const des = document.getElementById("des").value
    const price = document.getElementById("price").value
    const Sprice = document.getElementById("Sprice").value
    const slug = document.getElementById("slug").value
    const variation = document.getElementById("variation").value
    const stock = document.getElementById("stock").value
    const sku = document.getElementById("sku").value
    const tags = document.getElementById("tags").value
    const SubCategoryD = document.getElementById("subCat").value
    const CategoryD = document.getElementById("category").value
    


    const formData = new FormData();
    formData.append("thumbnail", file);
    formData.append('name', name);
    formData.append('des', des);
    formData.append('price', price);
    formData.append('sprice', Sprice);
    formData.append('slug', slug);
    formData.append('variation', variation);
    formData.append('stock', stock);
    formData.append('sku', sku);
    formData.append('tags', tags);
    formData.append('subCategory', SubCategoryD);
    formData.append('category', CategoryD);

    for(var i=0;i<=FileNames.length-1;i++){
        console.log(FileNames[i]);
        console.log(gallery[i]);
        // console.log(file);
        formData.append(FileNames[i], gallery[i]);

    }

    try {
      const res = await axios.post('http://localhost:3003/upload', formData, {
        headers: {
        //   'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });

      axios({
          method: "POST",
          url: "http://localhost:3003/upload",
          data: {
              test: "hey this is sample text"
          }
      })
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
        console.log(err);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='gallery'
            onChange={onGalChange}
            multiple
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {FileNames}
          </label>
        </div>
        <label htmlFor="name">Product Description</label>
        <input id="des" className="form-control" name="des" type="text" /><br />
        <label htmlFor="name">Product Name</label>
        <input id="name" className="form-control" name="name" type="text" /><br />
        <label htmlFor="name">Price</label>
        <input id="price" className="form-control" name="price" type="text" /><br />
        <label htmlFor="name">Sale Price</label>
        <input id="Sprice" className="form-control" name="sale_price" type="text" /><br />
        <label htmlFor="name">Slug</label>
        <input id="slug" className="form-control" name="slug" type="text" /><br />
        <label htmlFor="name">Variation</label>
        <input id="variation" className="form-control" name="variation" type="text" /><br />
        <label htmlFor="name">Stock</label>
        <input id="stock" className="form-control" name="stock" type="text" /><br />
        <label htmlFor="name">SKU</label>
        <input id="sku" className="form-control" name="sku" type="text" /><br />
        <label htmlFor="name">Tags</label>
        <input id="tags" className="form-control" name="tags" type="text" /><br />
       
        <label htmlFor="size">Sub Category</label>
                    <select className="form-control" id="category">
                      {category.map(cat => <option key={cat} id="cat">{cat.category}</option>)}
                    </select>
        <label htmlFor="size">Category</label>
                    <select className="form-control" id="subCat">
                      {subcategory.map(cat => <option key={cat} id="cat">{cat.subcategory}</option>)}
                    </select>
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
          onClick={handleClick}
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
