var React = require('react');
var ReactDOM = require('react-dom');
//var NavBar = require('./NavBar');
var MakeTable = require('./MakeTable');

var App = React.createClass({
    getInitialState: function () {
        return ({
            title: 'LAS React App',
            file: {}
        });
    },
    componentWillMount: function () {

    },
    componentDidMount: function () {
        var _this = this;
        this.serverRequest =
            axios
                .get("las.json")
                .then(function (result) {
                    _this.setState({
                        file: result.data.LASFile,
                        vers: result.data.LASFile._VERSION_INFORMATION,
                        well: result.data.LASFile._WELL_INFORMATION,
                        curves: result.data.LASFile._CURVE_INFORMATION,
                        ascii: result.data.LASFile._ASCII
                    });
                })
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    render: function () {
        return (
            <div>
                <h1> LAS JSON Output</h1>
                <ul>
                    <li>Using:
                        <li>Node.js</li>
                        <li>Express 4.15.2</li>
                        <li>React 15.5.4</li>
                    </li>
                </ul>
                <div className='bg-success'>
                    This App loads a JSON file converted from an LAS2.0 and formats the data.</div>
                <a href="las.json" target="_blank">las.json</a>

            <hr />
            <MakeTable data={this.state.vers} cap="Version Info" />
            <hr />
            <MakeTable data={this.state.well} cap="Well Info" />
            <hr />
            <MakeTable data={this.state.curves} cap="Curve Info" />
            <hr />
            <MakeTable data={this.state.ascii} hdrs={this.state.curves} cap="Curve Data" />
                </div>

        );
    }
});
module.exports = App;
