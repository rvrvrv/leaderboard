"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Generate each table row of user data
var User = function User(props) {
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      { className: "rank" },
      props.rank
    ),
    React.createElement(
      "td",
      { className: "camper" },
      React.createElement(
        "a",
        {
          href: "https://www.freecodecamp.com/" + props.username,
          target: "_blank"
        },
        React.createElement("img", { className: "avatar", src: props.img, alt: props.username }),
        React.createElement(
          "span",
          null,
          props.username
        )
      )
    ),
    React.createElement(
      "td",
      { className: "points recent" },
      props.recentPts
    ),
    React.createElement(
      "td",
      { className: "points alltime" },
      props.alltimePts
    )
  );
};

// Display table header

var TableHeader = function (_React$Component) {
  _inherits(TableHeader, _React$Component);

  function TableHeader() {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  // If user selects new category, display appropriate list

  TableHeader.prototype.handleClick = function handleClick(e) {
    if (e.target.className === "sortable") this.props.onChangeDisplay();
  };

  TableHeader.prototype.render = function render() {
    return React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "Rank"
        ),
        React.createElement(
          "th",
          null,
          "Camper"
        ),
        React.createElement(
          "th",
          {
            className: this.props.showing === "recent" && "showing" || "sortable",
            onClick: this.handleClick.bind(this)
          },
          "Recent Pts."
        ),
        React.createElement(
          "th",
          {
            className: this.props.showing === "alltime" && "showing" || "sortable",
            onClick: this.handleClick.bind(this)
          },
          "All-Time Pts."
        )
      )
    );
  };

  return TableHeader;
}(React.Component);

var Leaderboard = function (_React$Component2) {
  _inherits(Leaderboard, _React$Component2);

  function Leaderboard() {
    _classCallCheck(this, Leaderboard);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Leaderboard.prototype.render = function render() {
    // Generate all User components in body of table
    var tableBody = this.props[this.props.showing].map(function (user, i) {
      return React.createElement(User, {
        rank: i + 1,
        img: user.img,
        username: user.username,
        recentPts: user.recent,
        alltimePts: user.alltime
      });
    });
    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        null,
        React.createElement(TableHeader, {
          onChangeDisplay: this.props.onChangeDisplay.bind(this),
          showing: this.props.showing
        }),
        React.createElement(
          "tbody",
          null,
          tableBody
        )
      )
    );
  };

  return Leaderboard;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.handleChangeDisplay = function () {
      _this3.setState({
        showing: _this3.state.showing === "alltime" ? "recent" : "alltime"
      });
    };

    _this3.scrollToTop = function () {
      document.body.scrollTop = 0; // Chrome/Safari/Opera
      document.documentElement.scrollTop = 0; // IE/Firefox
    };

    _this3.state = {
      recent: null,
      alltime: null,
      showing: "recent",
      status: null
    };
    return _this3;
  }

  // Fetch FCC user data via async/await

  App.prototype.componentDidMount = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var api, recent, alltime;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              api = "https://fcctop100.herokuapp.com/api/fccusers/top";
              recent = undefined, alltime = undefined;
              _context.prev = 2;
              _context.next = 5;
              return fetch(api + "/recent");

            case 5:
              _context.next = 7;
              return _context.sent.json();

            case 7:
              recent = _context.sent;
              _context.next = 10;
              return fetch(api + "/alltime");

            case 10:
              _context.next = 12;
              return _context.sent.json();

            case 12:
              alltime = _context.sent;

              this.setState({ recent: recent, alltime: alltime, status: 'loaded' });
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](2);

              this.setState({ status: 'error' });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 16]]);
    }));

    return function componentDidMount() {
      return ref.apply(this, arguments);
    };
  }();

  // Change which list of users to display

  // Scroll back to the top of the page

  App.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "entire-board" },
      React.createElement(
        "h2",
        { className: "title", onClick: this.scrollToTop },
        "Camper Leaderboard"
      ),
      !this.state.status && React.createElement(
        "h1",
        { className: "blinking" },
        "Retrieving data..."
      ),
      this.state.status === 'error' && React.createElement(
        "h2",
        null,
        "Could not retrieve data. Please try again later."
      ),
      this.state.status === 'loaded' && React.createElement(Leaderboard, {
        recent: this.state.recent,
        alltime: this.state.alltime,
        showing: this.state.showing,
        onChangeDisplay: this.handleChangeDisplay
      })
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));
