import React, { useState } from 'react';
import Header from './Header';
import MakeModelMatchesTable from './MakeModelMatchesTable';
import SearchGroup from './SearchGroup';
import TotalVehiclesTable from './TotalVehiclesTable';

const App = () => {
    const [tableData, setTableData] = useState({});

    return (
        <div>
            <strong className="mobile_view_txt">iPhone X (Mobile View):</strong>

            <div className="wrap">
                <Header />

                <div className="search_container">
                    <SearchGroup setTableData={setTableData} />
                    <TotalVehiclesTable
                        totalVehiclesData={{
                            totalNum: tableData.totalNumFacetedSearchMatch,
                            low: tableData.lowestPrice,
                            med: tableData.medianPrice,
                            high: tableData.highestPrice,
                        }}
                    />
                    <MakeModelMatchesTable resultsByMakesModels={tableData.colatedResults} />
                </div>
            </div>
        </div>
    );
};

export default App;
