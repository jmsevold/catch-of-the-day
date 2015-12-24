import React from 'react';
import helpers from '../helpers.js';

var Fish = React.createClass({
  onButtonClick : function () {
    var key = this.props.index;
    this.props.addToOrder(key);
  },
  render : function() {
    var details     = this.props.details;
    var price       = helpers.formatPrice(details.price);
    var isAvailable = (details.status === 'available' ? true : false);
    var buttonText  = (isAvailable ? 'Add To Order' : 'Sold Out!');
    return(
      <li className="menu-fish">
        <img src={details.image} alt={details.name}/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{price}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    )
  }
});

export default Fish;