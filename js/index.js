"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React;
var Component = _React.Component;

/* functionality to add: 
clear all,
store in browser memory
*/

var id = 0;
// state components

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp(props) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { itemsList: [] };
    _this.updateList = _this.updateList.bind(_this);
    _this.toggleComplete = _this.toggleComplete.bind(_this);
    _this.clearEntries = _this.clearEntries.bind(_this);
    return _this;
  }

  TodoApp.prototype.updateList = function updateList(e) {
    var newTodo = {
      text: this._input.value,
      id: id++,
      completed: false
    };
    var updatedList = this.state.itemsList.concat([newTodo]);
    this.setState({ itemsList: updatedList });
    e.preventDefault();
    this._input.value = "";
  };

  TodoApp.prototype.toggleComplete = function toggleComplete(itemID) {
    var mutableList = this.state.itemsList;
    for (var obj in mutableList) {
      if (mutableList[obj].id == itemID) {
        mutableList[obj].completed = mutableList[obj].completed === true ? false : true;
        break;
      }
    }
    this.setState({ itemsList: mutableList });
    return;
  };

  TodoApp.prototype.clearEntries = function clearEntries() {
    this.setState({ itemsList: [] });
  };

  TodoApp.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      "div",
      { className: "outer-main" },
      React.createElement(
        "div",
        { className: "main" },
        React.createElement(Heading, null),
        React.createElement(
          "form",
          { onSubmit: this.updateList },
          React.createElement("input", { type: "text", ref: function ref(node) {
              _this2._input = node;
            } }),
          React.createElement(
            "button",
            { type: "submit" },
            "Add ToDo"
          )
        ),
        React.createElement(ClearLink, { clear: this.clearEntries }),
        React.createElement(TodoList, { list: this.state.itemsList, updateCompletedStatus: this.toggleComplete })
      )
    );
  };

  return TodoApp;
}(Component);

// comp components

var Heading = function (_Component2) {
  _inherits(Heading, _Component2);

  function Heading() {
    _classCallCheck(this, Heading);

    return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
  }

  Heading.prototype.render = function render() {
    return React.createElement(
      "h1",
      null,
      "Todo List"
    );
  };

  return Heading;
}(Component);

var ClearLink = function (_Component3) {
  _inherits(ClearLink, _Component3);

  function ClearLink() {
    _classCallCheck(this, ClearLink);

    return _possibleConstructorReturn(this, _Component3.apply(this, arguments));
  }

  ClearLink.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "clear", onClick: this.props.clear },
      "Clear List"
    );
  };

  return ClearLink;
}(Component);

var TodoList = function (_Component4) {
  _inherits(TodoList, _Component4);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, _Component4.apply(this, arguments));
  }

  TodoList.prototype.handleComplete = function handleComplete(e) {
    var itemID = e.target.id;
    this.props.updateCompletedStatus(itemID);
  };

  TodoList.prototype.render = function render() {
    var _this6 = this;

    var items = this.props.list.map(function (item) {
      return React.createElement(
        "li",
        { id: item.id, completed: item.completed, className: item.completed === true ? "complete" : " ", onClick: _this6.handleComplete.bind(_this6) },
        item.text
      );
    });
    return React.createElement(
      "ul",
      null,
      items
    );
  };

  return TodoList;
}(Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById("main"));