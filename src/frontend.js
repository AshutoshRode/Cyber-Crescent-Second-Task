import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './frontend.scss';

function TableDataBlock() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/wp-json/ashutosh-task/v1/fetch-data')
            .then(response => response.json())

            .then(data => setData(data))

            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) return
     <p className='loading'>
        Loading data...
        </p>;

    return (
        <div className="frontend-table">
            <h2>{data.title}</h2>
            <table>
                <thead>
                    <tr>
                        {data.data.headers.map(header => <th key={header}>
                            {header}
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data.data.rows).map(row => (
                        <tr key={row.id}>

                            <td>{row.id}</td>
                            <td>{row.fname} </td>
                            <td>{row.lname}</td>
                        
                            <td>{row.email}</td>
                            
                            <td>{new Date(row.date * 1000).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

document.querySelectorAll('.ashutosh-task-block').forEach(div => {
    ReactDOM.render(<TableDataBlock />, div);
});