import React, { Component } from 'react';

class Orders extends Component {
  render() {
    const {index, ...props} = this.props
    return (
        <div className="orders" {...props}>
            <div className="columns is-mobile is-centered">
                <div className="column is-half is-narrow">
                    <section className="section">
                        <div className="container">
                            <h3>{index}</h3>Hello Orders
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
  }
}

export default Orders;
