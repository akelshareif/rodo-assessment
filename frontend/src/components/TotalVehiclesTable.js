import React from 'react';

const TotalVehiclesTable = ({ totalVehiclesData: { totalNum, low, med, high } }) => {
    if (totalNum && low && med && high) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Total Vehicles Matched</th>
                        <th>{totalNum}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="w">Lowest Price</td>
                        <td>{low}</td>
                    </tr>
                    <tr>
                        <td>Median Price</td>
                        <td>{med.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Highest Price</td>
                        <td>{high}</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return null;
};

export default TotalVehiclesTable;
