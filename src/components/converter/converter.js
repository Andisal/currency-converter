import React, {Component} from 'react';
import ConverterService from "../services";


const Converter = (props)=> {
    const {valueMoney} = props;
    return(
        <div className="converter-right">
            <h3>Want to try the app right now ?</h3>
            <p>It is easy! Just enter the details below.</p>
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
                <input type="text" readOnly="readOnly" value={valueMoney}/>
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

    converter = new ConverterService();

    state = {
        value: 0,
        money: 0,
        from: '',
        to: ''
    };

    onChangeInputValue = (e) =>{
        const valueAmount = Number(e.target.value);
        if(valueAmount < 0)
        {
            return this.setState({value:valueAmount * (-1)})
        }
        this.setState({value:valueAmount})
    };

    onChangeSelectFrom = (e) => {
        const selectFrom = e.target.value;
        if(selectFrom === 'select') return this.setState({from: ''});
        this.setState({from:selectFrom})
    };

    onChangeSelectTo = (e) => {
        const selectTo = e.target.value;
        if(selectTo === 'select') return this.setState({to: ''});
        this.setState({to:selectTo})
    };

    onClickConvert = (e) => {
        e.preventDefault();
        this.converter.getResource(this.state.from).then((body)=>{
            const multiplier = body.rates[this.state.to];
            const result = (this.state.value * multiplier).toFixed(3);
            if(this.state.from === this.state.to) return this.setState({money:this.state.value});
            this.setState({money:result})
        })
    };

    render() {
        return(
            <Converter valueMoney={this.state.money}
                       onChangeInputValue={this.onChangeInputValue}
                       onClickConvert={this.onClickConvert}
                       onChangeSelectTo={this.onChangeSelectTo}
                       onChangeSelectFrom={this.onChangeSelectFrom}
            />
        )
    }
}


export default ConverterContainer;