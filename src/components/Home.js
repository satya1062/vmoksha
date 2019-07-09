import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'

 class Home extends Component{
	 constructor(props) {
      super(props);
      this.state = {products: []};
	   this.filterProduct = this.filterProduct.bind(this);
    }
	componentDidMount(){
      
          this.setState({ products: this.props.items });
    }
    filterProduct(event){
		 var updatedList = this.props.items;
   var filtValue = event.target.value;
	updatedList = updatedList.filter((product) => {
      let productTitle = product.title.toLowerCase()
      return productTitle.indexOf(
        filtValue.toLowerCase()) !== -1
    })
    this.setState({ products: updatedList });
		
	}
    handleClick = (id)=>{
        this.props.addToCart(id);
		alert("Product added successfully to the cart!!!");
    }
    render(){
		const { products } = this.state;
        let itemList = products.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price: ₹{item.price}</b></p>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
			<div className="col-lg-4 search">
		  <form>
        <fieldset className="form-group">
        <input type="text" className="form-control form-control-lg" placeholder="Enter Product Name" onChange={this.filterProduct}/>
        </fieldset>
        </form>
		</div>
                <h3 className="center">Products</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)