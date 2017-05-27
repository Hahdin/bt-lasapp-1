import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import NavBar from './NavBar'
import MakeTable from './MakeTable'

class App extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            title: 'LAS React App',
            file: {},
            newfile: {},
            fileState: {
                dataCount: 0,
                headingCount: 0,
                first: false,
                isAscii: false,
            }
        }
    }

    componentWillMount() {
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
            }.bind(this))
    }
    componentWillUnmount() {
        this.serverRequest.abort()
    }

    handleClick(e) {

    }

    first() {

    }
    headingCount() {

    }

    dataLine() {

    }

    processLine(line) {
        var qt = '"'
        var unit = 'UNIT": '
        var data = 'DATA": '
        var desc = 'DESC": '
        var comma = ', '
        var rtn = ''
        var bHeading = false
        var tab = '\t'

        line = line.trim()
        line = line.replace('"', '\'\'')
        var rtn
        if (line.indexOf('~') >= 0) {
            if (line.search(/~a\w?/i) >= 0) {
                this.state.fileState.isAscii = true
                line = '~ASCII'
            }
            if (line.search(/~V\w?/i) >= 0) {
                line = '~VERSION_INFORMATION'
            }
            if (line.search(/~W\w?/i) >= 0) {
                line = '~WELL_INFORMATION'
            }
            if (line.search(/~C\w?/i) >= 0) {
                line = '~CURVE_INFORMATION'
            }
            //remove tiddle, replace with underscore
            line = line.replace('~', '_')
            //replace whitespace with underscore
            line = line.replace(' ', '_')
            tab = '\t'
            bHeading = true;
            this.state.fileState.first = true;
            if (this.state.fileState.headingCount > 0) {//finish off last heading
                rtn = '\r\t},\r'
                rtn += tab + '"' + line + '": {\r'
            }
            else {
                rtn = tab + qt + line + '": {\r'
            }
            this.state.fileState.headingCount++
            return rtn;
        }
        else if (this.state.fileState.isAscii) {
            line = line.replace(/\s+/g,',' )//replace whitespaces with comma
            line = line.replace('\t', ',')
            //JSON arrays cannot leave blank (,,) values, if more than 1 missing value will fail
            line = line.replace(',,', ',-999.25,');

            var ch = "DATA" + this.state.fileState.dataCount++ + '":'
            rtn = tab + tab + qt + ch + '[' + line + ']'
            if (!this.state.fileState.first) {
                //not the first set of params for this heading, add the end of last line
                rtn = ',\n' + rtn;
            }
            this.state.fileState.first = false;
            return rtn;
        }
        else { //not a heading
            //not a heading, parse "name": value
            var t, r;
            var bHasUnits = line.indexOf('. ') < 0
            var x = line.indexOf('.')
            if (x < 0)
                return ''
            t = line.slice(0, x)
            t.trim()

            r = tab + tab + qt + t + qt + ': {'
            if (!this.state.fileState.first) {
                //not the first set of params for this heading, add the end of last line
                r = ',\n' + r
            }

            line = line.slice(x + 1)
            line = line.trim()

            x = line.indexOf(' ')
            if (x < 0)
                return ''

            t = line.slice(0, x)
            t.trim()
            if (bHasUnits)
                r += qt + unit + qt + t + qt + comma;
            else
                r += qt + unit + qt + qt + comma;

            line = line.slice(x + 1)
            line = line.trim()

            x = line.indexOf(':')
            if (x < 0)
                return ''
            var u = t
            t = line.slice(0, x)
            t.trim()
            if (bHasUnits)//get the data now
                u = t
            r += qt + data + qt + u + qt + comma
            line = line.slice(x + 1)
            line = line.trim()
            r += qt + desc + qt + line + qt + '}'
            this.state.fileState.first = false
            console.log(r)
            return r
       }
    }

    parseLasFile(file) {

        this.state.file = {}
        var newfile = ''
        newfile ='{ "LASFile":{ \r'
        var line = this.getLine()
        while (line.length > 0) {
            //var l = this.processLine(line)
            newfile += this.processLine(line)
            line = this.getLine()
        }
        newfile += '\r\t}\r}\r}'// end last block, and end brace
        var data
        if (newfile) {
            try{
                data = JSON.parse(newfile)
            }
            catch (e) {
                alert(e)
                this.setState({
                    fileState: {
                        dataCount: 0,
                        headingCount: 0,
                        first: false,
                        isAscii: false,
                    }
                })
                return
            }
        }
        //success, update the file state
        this.setState({
            file: data,
            vers: data.LASFile._VERSION_INFORMATION,
            well: data.LASFile._WELL_INFORMATION,
            curves: data.LASFile._CURVE_INFORMATION,
            ascii: data.LASFile._ASCII,
            fileState: {
                dataCount: 0,
                headingCount: 0,
                first: false,
                isAscii: false,
            }
        })

    }

    getLine() {
        var i = this.newfile.indexOf('\n')
        if (i < 0)
            return ''
        var line = this.newfile.slice(0, i)
        //remove from file
        this.newfile = this.newfile.slice(i+1)
        return line
    }

    handleChange(e) {
        document.body.style.cursor = 'wait'
        var _this = this
        var fl = e.target.files 
        var reader = new FileReader()
        reader.onload = function (event) {
            _this.newfile = event.target.result
            _this.parseLasFile()
            document.body.style.cursor = 'auto'
       }
        reader.readAsText(fl[0])
    }

    render() {
        var style = {
            display: 'none',
        }

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
                    This App loads an LAS file, converts it to a JSON file and formats the data.</div>
                <a href="las.json" target="_blank">las.json</a>
                <p>The source files for this app can be viewed at <a href="https://github.com/Hahdin/bt-lasapp-1">GitHub</a></p>
                <hr />
                <input id="file-input" type="file" name="name" enctype="multipart/form-data"
                   onChange={(event) => {
                       this.handleChange(event)
                   }}
                   onClick={(event) => {
                       this.handleClick(event)
                   }}
                />
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

