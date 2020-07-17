import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  FormControl,
  InputGroup,
  Col,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Minimum 3 characters required"),
  description: Yup.string()
    .required("Required")
    .min(2, "Minimum 2 characters required"),
  brand: Yup.string().required("Required"),
  imageurl: Yup.string(),
  category: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
});

class uploadProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
      data: {},
      editProduct: "",
      photo: "",
      intValues: {
        name: "",
        description: "",
        brand: "",

        category: "",
        price: "",
      },
    };
  }

  componentDidMount = async () => {
    if (this.props.match.params.id.length > 0) {
      console.log("ID", this.props.match.params.id.length);
      let response = await fetch(
        "http://localhost:3456/products/" + this.props.match.params.id
      );
      let parsedJson = await response.json();
      let editProduct = parsedJson[0];
      this.setState({ editProduct });
      const intValues = {
        name: editProduct.name,
        description: editProduct.description,
        brand: editProduct.name,
        imageurl: editProduct.imageurl,
        category: editProduct.category,
        price: editProduct.price,
      };
      this.setState({ intValues });
    } else {
      console.log("EMPTY ID");
    }
  };
  //   componentDidUpdate = async(prevState)=>{
  //     if(this.state.data !== prevState.data&&this.state.data!=={ }){

  //       let response = await fetch('http://127.0.0.1:3006/products/',{
  //           method:'POST',
  //           body:JSON.stringify(this.state.data),
  //           headers : new Headers({
  //               'Content-type': "application/json"
  //           })
  //       })
  //       let parsedJson = await response.json()

  //   }
  //   // if(this.props.match.params.id.length>3&&this.state.data!=={ }){
  //   //   console.log("DATA",this.state.data)
  //   //  console.log('EDITTING')

  // }
  // }

  sendInfo = async () => {
    if (this.props.match.params.id.length < 3) {
      let response = await fetch(
        "http://127.0.0.1:3456/products/" + this.props.match.params.id,
        {
          method: "PUT",
          body: JSON.stringify(this.state.data),
          headers: new Headers({
            "Content-type": "application/json",
          }),
        }
      );
      if (response.ok) {
        alert("SUCCESSFULLY EDITTED");
        this.props.history.push("/");
      }
    } else {
      let res = await fetch("http://127.0.0.1:3456/products/", {
        method: "POST",
        body: JSON.stringify(this.state.data),
        headers: new Headers({
          "Content-type": "application/json",
        }),
      });

      let productid_ = await res.json();

      if (res.ok) {
        const data2 = new FormData();
        data2.append("avatar", this.state.photo);
        let response = await fetch(
          "http://127.0.0.1:3456/products/" + productid_._id + "/uploadPhoto/",
          {
            method: "POST",
            body: data2,
          }
        );
        console.log("RERE", res);
      }
    }
  };
  saveImage = async (e) => {
    e.preventDefault();
    this.setState({ photo: e.target.files[0] }, () => {
      console.log(this.state.photo);
    });
  };

  render() {
    return (
      <Container className="form mb-3">
        <p className="display-4 text-center">Upload a product</p>
        <Formik
          validationSchema={schema}
          // onSubmit={values => {
          //   this.setState({data : values}),
          //   this.sendInfo()
          //   console.log(values);
          // }}
          onSubmit={(values) => {
            this.setState({ data: values }, this.sendInfo);
          }}
          enableReinitialize
          initialValues={this.state.intValues}
        >
          {({
            handleSubmit,
            handleBlur,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={errors.name}
                    placeholder="Name*"
                  />
                  <Form.Control.Feedback type="valid" tooltip>
                    Looks good!
                  </Form.Control.Feedback>
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
                    isInvalid={errors.brand}
                    placeholder="brand of product*"
                  />
                  <Form.Control.Feedback type="valid" tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.brand}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <input
                className=""
                type="file"
                onChange={this.saveImage}
                accept="image/png,image/jpeg"
              />

              <Form.Group as={Col} md={13} controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="product description*"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type="valid" tooltip>
                  Looks good!
                </Form.Control.Feedback>
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
                    placeholder="category*"
                    value={values.category}
                    onChange={handleChange}
                    isValid={touched.category && !errors.category}
                    isInvalid={errors.category}
                  />
                  <Form.Control.Feedback type="valid" tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="price*"
                    value={values.price}
                    onChange={handleChange}
                    isValid={touched.price && !errors.price}
                    isInvalid={errors.price}
                  />
                  <Form.Control.Feedback type="valid" tooltip>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button className="submitBtn" type="submit">
                Submit product
              </Button>
              {/* {console.log(errors)} */}
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}
export default uploadProduct;
