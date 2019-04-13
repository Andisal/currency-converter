import React, {Component} from 'react';
import ConverterService from "../services";


const Converter = (props)=> {
    return(
        <div className="converter-right">
            <h3>How our crypto converter works</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, iste.</p>
            <form action="" className="form-converter">
                <input type="number" pattern="\d [0-9]" required placeholder="Amount" onChange={props.onChangeInputValue.bind(this)}/>
                <select name="" id="" onChange={props.onChangeSelectFrom.bind(this)}>
                    <option value="select">Select</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="RUB">RUB</option>
                    <option value="CAD">CAD</option>
                    <option value="NZD">NZD</option>
                    <option value="JPY">JPY</option>
                </select>
                <input type="text" readOnly="readOnly" value={props.money}/>
                <select name="" id="" onChange={props.onChangeSelectTo.bind(this)}>
                    <option value="select">Select</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="RUB">RUB</option>
                    <option value="CAD">CAD</option>
                    <option value="NZD">NZD</option>
                    <option value="JPY">JPY</option>
                </select>
                <div className="button">
                    <button className="convert-button" onClick={props.onClickConvert}>Convert</button>
                </div>
            </form>
        </div>
    )
};

class ConverterContainer extends Component {

    converter = new ConverterService()

    state = {
        value: 0,
        money: 0,
        from: '',
        to: ''
    }

    onChangeInputValue = (e) =>{
        this.setState({value:e.target.value})
    }

    onChangeSelectFrom = (e) => {
        this.setState({from:e.target.value})
    }

    onChangeSelectTo = (e) => {
        this.setState({to:e.target.value})
    }

    onClickConvert = (e) => {
        e.preventDefault()
        this.converter.getResource(this.state.from).then((body)=>{
            const multiplier = body.rates[this.state.to]
            const result = (this.state.value * multiplier).toFixed(3)
            this.setState({money:result})
        })
    }

    render() {
        return(
            <Converter money={this.state.money} onChangeInputValue={this.onChangeInputValue} onClickConvert={this.onClickConvert} onChangeSelectTo={this.onChangeSelectTo} onChangeSelectFrom={this.onChangeSelectFrom}/>
        )
    }
}


export default ConverterContainer;