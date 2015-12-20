var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route  = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var helpers = require('./helpers.js');


var App = React.createClass({
  getInitialState: function() {
    return {
      fishes : {},
      orders : {}
    }
  },

  addToOrder: function(key) {
    this.state.orders[key] = this.state.orders[key] + 1 || 1;
    this.setState({orders: this.state.orders});
  },

  addFish : function(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({fishes : this.state.fishes});
  },

  loadSamples : function() {
    this.setState({
      fishes: require('./sample-fishes')
    });
  },

  renderFish : function(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
  },

  render: function(){
    var fishes = this.state.fishes;
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Good"/>
          <ul className="list-of-fishes">
            {Object.keys(fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
      </div>
    )
  }
});

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

//alternative prop to AddFishForm is addFish={this.props.addFish}
var Inventory = React.createClass({
  render: function() {
    return(
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
});

var AddFishForm = React.createClass({

  createFish: function(event){
    event.preventDefault();
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status:this.refs.status.value,
      desc: this.refs.desc.value,
      image:this.refs.image.value
    }
    // Add the fish to the App State
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },
  render : function() {
    return(
      
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price"/>
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image"/>
        <button type="Submit">+ Add Item </button>
      </form>
    )
  }
});



var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1> Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
        day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});

var Order = React.createClass({
  render: function() {
    return(
      <p>Order</p>
    )
  }
});




/* 
  StorePicker
  This will let us make <StorePicker/>
*/

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

var NotFound = React.createClass({
  render : function() {
    return(
      <h1>Not Found</h1>
    )
  }
});

var routes = (
  <Router history={createBrowserHistory()}>
    <Router path="/" component={StorePicker}/>
    <Router path="/store/:storeId" component={App}/>
    <Router path="*" component={NotFound} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
