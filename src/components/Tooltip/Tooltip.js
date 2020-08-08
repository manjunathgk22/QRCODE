import { h, Component } from 'preact';
import './Style.scss'

const Tooltip = ({text='', desc=''}) => {
    return (
        <div class="tooltip">{text}
            <span class="tooltiptext">{desc}</span>
        </div>
    );
};

export default Tooltip;