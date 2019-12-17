import React,{Component} from "react";

class DropDown extends Component {
    handleChange = ddl => {
        this.props.onChange(ddl.value, ddl.options[ddl.selectedIndex].text)
      };

  render() {
      console.log('hi', this.props);
    return (
        <select
            id={this.props.id}
            name={this.props.name}
            onChange={(e) => this.handleChange(e.target)} 
            style={this.props.style}>
                { this.props.options.map((obj, i) => ( 
                    <option key={i} value={obj.val} disabled={obj.disabled ? true : false}>{obj.text}</option>
                ))}

        </select>
        )
    }
}

export default DropDown