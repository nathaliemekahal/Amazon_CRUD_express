import React, { Component } from 'react'
import {Container,Form,Button,FormControl,InputGroup,Col} from 'react-bootstrap'
import { Formik } from 'formik';
import * as Yup from 'yup'


const schema = Yup.object({
  name : Yup.string().required('Required').min(3,'Minimum 3 characters required'),
  description : Yup.string().required('Required').min(2,'Minimum 2 characters required'),
  brand : Yup.string().required('Required'),
  imageUrl : Yup.string(),
  category : Yup.string().required('Required'),
  price : Yup.string().required('Required'),
  
})




class uploadProduct extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hide : true,
      data :{},
      editProduct:''
    }
  }
  

  componentDidMount=async()=>{
   if(this.props.match.params.id){
     console.log('ID',this.props.match.params.id)
    let response=await fetch('http://localhost:3006/products/'+this.props.match.params.id)
    let editProduct=await response.json()
    console.log('editProduct',editProduct)
    this.setState({editProduct})
   }
   else{
     console.log('EMPTY ID')
   }
  }
  componentDidUpdate = async(prevState)=>{
    if(this.state.data !== prevState.data){
    console.log(this.state.data)
      let response = await fetch('http://127.0.0.1:3006/products/',{
          method:'POST',
          body:JSON.stringify(this.state.data),
          headers : new Headers({
              'Content-type': "application/json"
          })
      })
      let parsedJson = await response.json()
      console.log(parsedJson)
  }
}

  render(){
  return(
  
  <Container className='form mb-3'>
    <p className='display-4 text-center'>Upload a product</p>
    <Formik
    validationSchema= {schema}
    // onSubmit={values => {
    //   this.setState({data : values}),
    //   this.sendInfo()
    //   console.log(values);
    // }}
    onSubmit = {values =>{
        this.setState({data : values})
    }
    }
    initialValues = {{
      name:'',
      description:'',
      brand :'',
      imageUrl:'',
      category :'',
      price:''
    }}
    >
    {({
      handleSubmit,
      handleBlur,
      handleChange,
      values,
      touched,
      isValid,
      errors,
    })=>(
      <Form noValidate onSubmit={handleSubmit} >
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid ={ errors.name}
                placeholder='Name*'
              />
              <Form.Control.Feedback type='valid' tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.name}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                isValid={touched.brand && !errors.brand}
                isInvalid ={errors.brand}
                placeholder='brand of product*'
              />
              <Form.Control.Feedback type='valid' tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.brand}
                </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>
          <Form.Group as={Col} md={13} controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="imageUrl"
                name="imageUrl"
                placeholder='link of the image*'
                value={values.imageUrl}
                onChange={handleChange}
                isValid={touched.imageUrl && !errors.imageUrl}
                isInvalid ={errors.imageUrl}
              />
              <Form.Control.Feedback type='valid' tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.imageUrl}
                </Form.Control.Feedback>
          </Form.Group>
        <Form.Group as={Col} md={13} controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder='product description*'
            value={values.description}
            onChange={handleChange}
            isValid={touched.description && !errors.description}
            isInvalid ={errors.description}
          />
          <Form.Control.Feedback type='valid' tooltip>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid" tooltip>
              {errors.description}
            </Form.Control.Feedback>
        </Form.Group>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder='category*'
                value={values.category}
                onChange={handleChange}
                isValid={touched.category && !errors.category}
                isInvalid ={errors.category}
              />
              <Form.Control.Feedback type='valid' tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.category}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder='price*'
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
                isInvalid ={errors.price}
              />
              <Form.Control.Feedback type='valid' tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.price}
                </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>

        <Button className='submitBtn' type="submit"
        disabled={(Object.keys(errors).length === 0) ? null : this.state.hide}
        >Submit product</Button>
        {/* {console.log(errors)} */}
      </Form>

    )}
    </Formik>
  </Container>
  )

 }
}
export default uploadProduct