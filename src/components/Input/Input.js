import { h, Component } from 'preact';
import "./style.scss";

export default function Input({
    placeholder = "",
    type = "",
    onChange = () => {},
    style = {},
    rows=4,
    cols=50,
    bordered= false,
    value='',
    ...props
}) {
    return (
        <div className="button-wrapper">
            {type === "textArea" ? (
                <textarea style={style}  placeholder={placeholder} value = {value} rows={rows} cols={cols} onChange={onChange}/>
            ) : (
                <div>
                    <input
                        placeholder={placeholder}
                        type={type}
                        onChange={onChange}
                        className={`effect-2 ${bordered? 'bordered':''}` }
                        style={style}
                        value = {value}
                        {...props}
                    />
                    <span className="focus-border"></span>
                </div>
            )}
        </div>
    );
}
