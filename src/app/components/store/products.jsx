import React, { Component } from 'react';

class Products extends Component {
  render() {
    const {index, ...props} = this.props
    return (
        <div className="products" {...props}>
            <div className="columns is-mobile is-centered">
                <div className="column">
                    <section className="section">
                        <div className="container">
                            <h3>{index}</h3>Hello Products
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
  }
}

export default Products;
