import React from 'react';
import helpers from '../helpers.js';

var Order = React.createClass({
  renderOrder : function(key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>x</button>

    if (!fish) {
      return <li key={key}>Sorry, fish no longer available!{removeButton}</li>
    }
    return (
      <li key={key}>
        {count}lbs
        {fish.name}
        <span className="price">{helpers.formatPrice(count * fish.price)}</span>
        {removeButton}
      </li>
    )
  },
  render: function() {
    var orderIds = Object.keys(this.props.order);
    var total         = orderIds.reduce((prevTotal,key)=> {
      var fish        = this.props.fishes[key]
      var count       = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';

      if (fish && isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0)
      }
      return prevTotal;
    },0);
    return(
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total: {helpers.formatPrice(total)}</strong>
          </li>
        </ul>
      </div>
    )
  },

  propTypes : {
    fishes : React.PropTypes.object.isRequired,
    order : React.PropTypes.object.isRequired,
    removeFromOrder : React.PropTypes.func.isRequired
  }
});

export default Order;
