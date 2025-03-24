import React, { useEffect } from "react";
import MenuService from "../services/MenuService";
import "./beverages-panel.css";
const BeverageList = () => {
    const { beverages, getBeverages , currentPage, totalPages} = MenuService();

    useEffect(() => {
        getBeverages(0,9);
    }, [getBeverages]);


    function goToPreviousPage() {
        getBeverages(currentPage-1,9);
    }

    function goToNextPage(){
        getBeverages(currentPage+1,9);
    }

    return (
        <div>
            <div className="beverages-content">
                <div className="beverages-container">
                    {beverages.map((beverage) => (
                        <div key={beverage.beverage_id} className="beverage-item">
                            <h3>{beverage.beverageName}</h3>
                            <p>Price: {beverage.beveragePrice}<small>$</small></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination-controls">
                <button onClick={goToPreviousPage}  disabled={currentPage === 0}>Previous</button>
                <span>Page {currentPage+1} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
            </div>
        </div>

    )

};

export default BeverageList;
