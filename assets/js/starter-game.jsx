import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
	  this.tiles = 
		 [
		  {value: "A", chekced: "false"},
		  {value: "B", checked: "false"},
		  {value: "C", checked: "false"},
		  {value: "D", checked: "false"},
		  {value: "E", checked: "false"},
		  {value: "F", checked: "false"},
		  {value: "G", checked: "false"},
		  {value: "H", checked: "false"},
		  {value: "A", checked: "false"},
		  {value: "B", checked: "false"},
		  {value: "C", checked: "false"},
		  {value: "D", checked: "false"},
		  {value: "E", checked: "false"},
		  {value: "F", checked: "false"},
		  {value: "G", checked: "false"},
		  {value: "H", checked: "false"}
		 ];
	  const shuffleTiles = _.shuffle(this.tiles);
	  this.timer = null;
	  this.state = {
		  clicks: 0,
		  tiles: shuffleTiles,
		  lastClicked: -1,
	  };
  }

  render() {
	  let row1 = _.map(this.state.tiles, (tile, ii) => {
		  if (ii < 4) {
			  return <DisplayTile tile={tile} root={this} key={ii} ii={ii} />
		  }
	  });

	  let row2 = _.map(this.state.tiles, (tile, ii) => {
		  if (ii >= 4 && ii < 8) {
			  return <DisplayTile tile={tile} root={this} key={ii} ii={ii} />
		  }
	  });
  	  let row3 = _.map(this.state.tiles, (tile, ii) => {
		  if (ii >= 8 && ii < 12) {
			  return <DisplayTile tile={tile} root={this} key={ii} ii={ii} />
		  }
	  });
	  let row4 = _.map(this.state.tiles, (tile, ii) => {
		  if (ii >= 12 && ii < 16) {
			  return <DisplayTile tile={tile} root={this} key={ii} ii={ii} />
		  }
	  });

	  let resetButton = <p><button onClick={() => this.reset_memory()}> Reset the Game</button></p>

	  return(
		  <div className="container">

		  <div className="row">
		  {row1}
		  </div>
		  <div className="row">
		  {row2}
		  </div>
		  <div className="row">
		  {row3}
		  </div>
		  <div className="row">
		  {row4}
		  </div>

		  <div className="row">
		  <p>Clicks you made so far: {this.state.clicks}</p>
		  </div>

		  {resetButton}

		  </div>
	  );
  }
 
 is_checked(ii) {
	let xx = this.state.tiles;
	let lc = this.state.lastClicked;
	if (xx[ii].value != xx[lc].value) {
		let yy = _.map(this.state.tiles, (tile, jj) => {
			if (ii == jj || lc == jj) {
				return _.assign({}, tile, {completed: false});
			}
			else {
				return tile;
			}
		});
		this.setState(_.assign({}, this.state, {tiles: yy}, {lastClicked: -1}));
	}
	else {
		this.setState(_.assign({}, this.state, {tiles: xx}, {lastClicked: -1}));
	}
	this.timer = null;
}



 tile_click(ii) {
	if (this.timer == null) {
		let xx = _.map(this.state.tiles, (tile, jj) =>  {
			if (ii == jj) {
				return _.assign({}, tile, {completed: true});
			}
			else {
				return tile;
			}
		});

		if (this.state.lastClicked == -1) {
			this.setState(_.assign({}, this.state, {tiles: xx}, {clicks: this.state.clicks + 1}, {lastClicked: ii}));
		}
		else {
			this.setState(_.assign({}, this.state, {tiles: xx}, {clicks: this.state.clicks + 1}));
			this.timer = setTimeout((function() {this.is_checked(ii)}).bind(this), 1000);
		}
	}
}

reset_memory() {
	const shuffleTiles = _.shuffle(this.tiles);
	this.setState(
		{ tiles: shuffleTiles,
			timer: null,
			clicks: 0,
			lastClicked: -1,
		}
	);

}
}
/**
 * Got the shuffle code from:
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffleArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function DisplayTile(props) {
	let {tile, root, ii} = props

	if (tile.completed) {
		return <div className="column">
			<p><button>{tile.value}</button></p>
			</div>
	}

	else {
		return <div className="column">
			<p><button onClick={() => root.tile_click(ii)}></button></p>
			</div>
	}
}

