// Generate each table row of user data
const User = props => (
  <tr>
    <td className="rank">{props.rank}</td>
    <td className="camper">
      <a
        href={`https://www.freecodecamp.com/${props.username}`}
        target="_blank"
      >
        <img className="avatar" src={props.img} alt={props.username} />
        <span>{props.username}</span>
      </a>
    </td>
    <td className="points recent">{props.recentPts}</td>
    <td className="points alltime">{props.alltimePts}</td>
  </tr>);

// Display table header
class TableHeader extends React.Component {
  // If user selects new category, display appropriate list
  handleClick = (e) => {
    if (e.target.className === 'sortable') this.props.onChangeDisplay();
  };

  render() {
    return (
      <thead>
        <tr>
          <th>Rank</th>
          <th>Camper</th>
          <th
            className={
              (this.props.showing === 'recent' && 'showing') || 'sortable'
            }
            onClick={this.handleClick}
          >
            Recent Pts.
          </th>
          <th
            className={
              (this.props.showing === 'alltime' && 'showing') || 'sortable'
            }
            onClick={this.handleClick}
          >
            All-Time Pts.
          </th>
        </tr>
      </thead>
    );
  }
}

const Leaderboard = props => (
  <div>
    <table>
      <TableHeader
        onChangeDisplay={props.onChangeDisplay.bind(this)}
        showing={props.showing}
      />
      <tbody>
        {// Generate all User components in body of table
          props[props.showing].map((user, i) =>
            (<User
              rank={i + 1}
              img={user.img}
              username={user.username}
              recentPts={user.recent}
              alltimePts={user.alltime}
            />))
        }
      </tbody>
    </table>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: null,
      alltime: null,
      showing: 'recent',
      status: null,
    };
  }

  // Fetch FCC user data via async/await
  async componentDidMount() {
    const api = 'https://fcctop100.herokuapp.com/api/fccusers/top';
    let recent;
    let alltime;
    try {
      recent = await (await fetch(`${api}/recent`)).json();
      alltime = await (await fetch(`${api}/alltime`)).json();
      this.setState({ recent, alltime, status: 'loaded' });
    } catch (e) {
      this.setState({ status: 'error' });
    }
  }

  // Change which list of users to display
  handleChangeDisplay = () => {
    this.setState({
      showing: this.state.showing === 'alltime' ? 'recent' : 'alltime',
    });
    this.scrollToTop();
  };

  // Scroll back to the top of the page
  scrollToTop = () => {
    document.body.scrollTop = 0; // Chrome/Safari/Opera
    document.documentElement.scrollTop = 0; // IE/Firefox
  };

  render() {
    return (
      <div className="entire-board">
        <h2 className="title" onClick={this.scrollToTop}>Camper Leaderboard</h2>
        {!this.state.status && <h1 className="blinking">Retrieving data...</h1>}
        {this.state.status === 'error' && <h2>Could not retrieve data. Please try again later.</h2>}
        {this.state.status === 'loaded' && <Leaderboard
          recent={this.state.recent}
          alltime={this.state.alltime}
          showing={this.state.showing}
          onChangeDisplay={this.handleChangeDisplay}
        />
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
