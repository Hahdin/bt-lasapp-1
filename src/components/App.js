import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import NavBar from './NavBar'
import MakeTable from './MakeTable'

class App extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            title: 'LAS React App',
            file: {}
        }
    }
    componentWillMount() {
        //alert("comp will mount")
    }
    componentDidMount() {
        var _this = this
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
                    })
                })
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }
    componentDidUnmount() {
        //alert("comp Did unmount")
    }

    render() {
        return (
            <div>
                <NavBar />
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
                <p>The source files for this app can be viewed at <a href="https://github.com/Hahdin/bt-lasapp-1">GitHub</a></p>

                <hr />
                <MakeTable data={this.state.vers} cap="Version Info" />
                <hr />
                <MakeTable data={this.state.well} cap="Well Info" />
                <hr />
                <MakeTable data={this.state.curves} cap="Curve Info" />
                <hr />
                <MakeTable data={this.state.ascii} hdrs={this.state.curves} cap="Curve Data" />
            </div>
        )
    }
}
export default App

