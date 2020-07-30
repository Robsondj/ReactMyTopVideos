import React from 'react';

function FormTextArea({ label, value, name, onChange }) {
    return(
        <label>
            {label}:
            <textarea
            type="text"
            value={value}
            name={name}
            onChange={onChange}
            />
        </label>
    )
}

export default FormTextArea;