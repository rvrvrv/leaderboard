// Generate each table row of user data
const User = props =>
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
  </tr>;

// Display table header
class TableHeader extends React.Component {
  // If user selects new category, display appropriate list
  handleClick(e) {
    if (e.target.className !== "showing") this.props.onShowChange();
  }

  render() {
    return (
      <thead>
        <tr>
          <th>Rank</th>
          <th>Camper</th>
          <th
            className={
              (this.props.showing === "recent" && "showing") || "sortable"
            }
            onClick={this.handleClick.bind(this)}
          >
            Recent Pts.
          </th>
          <th
            className={
              (this.props.showing === "alltime" && "showing") || "sortable"
            }
            onClick={this.handleClick.bind(this)}
          >
            All-Time Pts.
          </th>
        </tr>
      </thead>
    );
  }
}

class Leaderboard extends React.Component {
  render() {
    // Generate all HTML for body of table
    const tableBody = this.props[this.props.showing].map((user, i) =>
      <User
        rank={i + 1}
        img={user.img}
        username={user.username}
        recentPts={user.recent}
        alltimePts={user.alltime}
      />
    );
    return (
      <div>
        <table>
          <TableHeader
            onShowChange={this.props.onShowChange.bind(this)}
            showing={this.props.showing}
          />
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],
      alltime: [],
      showing: "alltime"
    };
  }

  // Fetch FCC user data via async/await
  async componentDidMount() {
    const api = "https://fcctop100.herokuapp.com/api/fccusers/top";
    const recent = await (await fetch(`${api}/recent`)).json();
    const alltime = await (await fetch(`${api}/alltime`)).json();
    this.setState({ recent, alltime });
  }

  // Change which list of users to display
  handleShowChange() {
    this.setState({
      showing: this.state.showing === "alltime" ? "recent" : "alltime"
    });
  }

  // Scroll back to the top of the page
  scrollToTop = () => {
    document.body.scrollTop = 0; // Chrome/Safari/Opera
    document.documentElement.scrollTop = 0; // IE/Firefox
  };

  render() {
    return (
      <div id='fullBoard'>
        <h2 id='title' onClick={this.scrollToTop}>Camper Leaderboard</h2>
        <Leaderboard
          recent={this.state.recent}
          alltime={this.state.alltime}
          showing={this.state.showing}
          onShowChange={this.handleShowChange.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
