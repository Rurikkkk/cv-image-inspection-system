import { useState, useEffect } from "react";
import React from 'react';
import './StatusCircle.css';

export function StatusCircle({ isChecked = false }) {
  return (
    <div className={`status-circle ${isChecked ? 'checked' : 'unchecked'}`} style={{ marginLeft: '10px' }}>
    </div>
  );
}

export default function NotifiedPhoto(props) {
  const storageKey = `status-${props.file.source}`;
  
  const getInitialChecked = () => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : false;
  };

  const [checked, setChecked] = useState(getInitialChecked);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, storageKey]);

  return (
    <tr key={props.file.source}>
      <td>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {props.file.source}
          <StatusCircle isChecked={checked} />
        </div>
      </td>
      <td>
        <button
          className='btn btn-secondary'
          onClick={() => {
            props.clickHandler();
            setChecked(true);
          }}
        >
          Просмотр
        </button>
      </td>
      <td>
        <h6> Возможные предметы: </h6>
        <p>{props.file.alerts.join(', ')}</p>
      </td>
      <td>
        <span>
            Статус: {checked ? 'просмотрено' : 'не просмотрено'}
        </span>
      </td>
    </tr>
  );
}