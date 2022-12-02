import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import './style.css';

const InputSearchTable = ({ setSearch }) => {
  return (
    <div className="group-search">
      <span className="icon-search">
        <BiSearchAlt />
      </span>
      <input
        type="text"
        className="input-search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filtrar..."
      />
    </div>
  );
};

export default InputSearchTable;
