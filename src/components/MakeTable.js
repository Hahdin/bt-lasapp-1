import React, { Component } from 'react'

class MakeTable extends Component {
    render() {
        if (this.props.data == undefined)
            return <div></div>
        var mainData = this.props.data
        var mainKeys = Object.keys(mainData)
        var mainObject = Object.values(mainData)
        var headings = <tr><th>MNEM</th><th>UINT</th><th>DATA</th><th>Desc.</th></tr>
        var caps = this.props.cap
        if (this.props.cap == "Curve Info")
            headings = <tr><th>MNEM / Curve ID</th><th>UINT</th><th>DATA</th><th>Desc.</th></tr>
        if (this.props.cap == "Curve Data") {
            var curveKeys = Object.keys(this.props.hdrs)
            var head = curveKeys.map(function (key, i) {
                return <th>{key}</th>
            })
            headings = <tr><th>MNEM</th>{head}</tr>
        }
        var output = mainKeys.map(function (key, i) {
            var id = <td>{key}</td>
            var data = mainObject[i]
            var dataKeys = Object.keys(data)
            var dataVals = Object.values(data)
            var dataOut = dataKeys.map(function (datakey, j) {
                var val = dataVals[j]
                if (caps == "Curve Data") {
                    if (val == "-999.25")
                        return (<td className="bg-danger">{dataVals[j]}</td>);
                    else {
                        var st = { color: 'blue' }
                        if (parseFloat(val) < 0)
                            st = { color: 'red' }
                        return (<td className="bg-success" style={st}>{dataVals[j]}</td>)
                    }
                }
                else
                    return (<td>{dataVals[j]}</td>)
            });
            return <tr>{id}{dataOut}</tr>
        });
        return <div>
            <table className='table-hover table-bordered'>
                <caption>{this.props.cap}</caption>
                <tbody>
                    {headings}
                    {output}
                </tbody>
            </table>
        </div>

    }
}
export default MakeTable
