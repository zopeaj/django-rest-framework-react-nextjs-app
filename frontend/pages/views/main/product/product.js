import { useState, Component, Fragment } from "react";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../../../../data/product/service/api/ProductApi";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    products: state.products,
    username: state.user.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
    addProduct: (data) => {
      dispatch(addProduct(data));
    },
    updateProduct: (data, id) => {
      dispatch(updateProduct(id, data));
    },
    deleteProduct: (id) => {
      dispatch(deleteProduct(id));
    }
  }
}

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateProductId: null,
      name: "",
      category: "",
      product_image: null,
      data: { }
    }
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  resetForm = () => {
    this.setState({ name: "", category: "", product_image: null, updateProductId: null});
  }

  selectForEdit = (id) => {
    let product = this.props.products[id];
    this.setState({ name: product.name, updateProductId: id, category: product.category, product_image: product.product_image});
  }

  submitProduct = (e) => {
    e.preventDefault();

    if(this.state.updateProductId === null) {
      this.props.addProduct(this.state.data).then(this.resetForm);
    }else {
      this.props.updateProduct(this.state.updateProductId, this.state.data);
    }
    this.resetForm();
  }

  onDelete = (id) => {
    this.props.deleteProduct(id);
  }

  onEdit = (id) => {
    this.props.updateProduct(id, this.state.data);
  }

  render() {
    return (
     <Fragment>
       <div>
         <h3>Products</h3>
         <table>
           <tbody>
             { this.props.products.map((product, id) => (
               <tr key={id}>
                 <td>
                   <img src={product.product_image} />
                 </td>
                 <td>
                   { product.category }
                 </td>
                 <td>
                   { product.name }
                 </td>
                 <td>
                   <button>edit</button>
                 </td>
                 <td>
                   <button onClick={() => this.onDelete(id)}>
                     delete
                   </button>
                 </td>
                 <td>
                   <button onClick={() => this.onEdit(id)}>
                     edit
                   </button>
                 </td>
               </tr>
             )) }
           </tbody>
         </table>
         <h3>Add new Product</h3>
         <form onSubmit={this.submitProduct}>
           <input value={this.state.name} placeholder="Enter name here..."
           onChange={this.onProductNameChange} />
           <input value={this.state.category} placeholder="Enter category here..." onChange={this.onProductCategoryChange} />
           <button type="submit">Save Product</button>
         </form>
         <button onClick={this.resetForm}>Reset</button>
       </div>
     </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
