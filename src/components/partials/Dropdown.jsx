import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="select">
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option  value="0" disabled>
          {title}
        </option>
        {options.map((p, i) => (
          <option key={i} value={p}>
            {p.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
