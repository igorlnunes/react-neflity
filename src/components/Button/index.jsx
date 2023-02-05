import './styles.css';

import { Component } from "react";

//classe apenas para testar - pode ser feito via funcao
export class Button extends Component {
    render() {
        const { text, onClick, disabled } = this.props;
        return (
            <button disabled={disabled} className='button' onClick={onClick}>
                {text}
            </button>
        )
    }
}