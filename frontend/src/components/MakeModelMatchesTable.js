import React from 'react';

const MakeModelMatchesTable = ({ resultsByMakesModels }) => {
    if (resultsByMakesModels) {
        return (
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Matches by Make and Model </th>
                    </tr>
                </thead>
                <tbody>
                    {resultsByMakesModels.map((result, idx) => (
                        <tr key={result.model + idx}>
                            <td className="w">
                                <span className="make-sub-grp">{result.make}</span>{' '}
                                <span className="model-sub-grp">{result.model}</span>
                            </td>
                            <td>{result.vehicle_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return null;
};

export default MakeModelMatchesTable;
