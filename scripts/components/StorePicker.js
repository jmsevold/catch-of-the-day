import React from 'react';
import { History } from 'react-router';
import helpers from '../helpers.js';

var StorePicker = React.createClass({
  mixins : [History],
  goToStore: function(event) {
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    this.history.pushState(null,'/store/' + storeId);
  },

  render : function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()}required/>
        <input type="Submit"/>
      </form>
    )
  }
});

export default StorePicker;