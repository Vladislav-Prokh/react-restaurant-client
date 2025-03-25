import React, { Component } from "react";
import MenuService from "../services/MenuService.js";
import "./lunches-panel.css";

class LunchesPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lunches: [],
            currentPage: 0,
            totalPages: 0,
            error: null,
        };
    }

    async componentDidMount() {
        await this.loadLunches(0);
    }

    loadLunches = async (page) => {
        try {
            const { getLunches } = MenuService.getState();
            await getLunches(page, 9);
            const { lunches, currentPage, totalPages } = MenuService.getState();
            this.setState({ lunches, currentPage, totalPages });
        } catch (error) {
            this.setState({ error: "An error occurred while fetching lunches" });
        }
    };

    goToPreviousPage = async () => {
        const { currentPage } = this.state;
        if (currentPage > 0) {
            await this.loadLunches(currentPage - 1);
        }
    };

    goToNextPage = async () => {
        const { currentPage, totalPages } = this.state;
        if (currentPage < totalPages - 1) {
            await this.loadLunches(currentPage + 1);
        }
    };

    render() {
        const { lunches, currentPage, totalPages, error } = this.state;
        return (
            <div>
                <div className="lunches-content">
                    {error && <p className="error-message">{error}</p>}
                    <div className="lunches-container">
                        {lunches.map((lunch, index) => (
                            <div key={index} className="lunch-item">
                                <div className="lunch-info">
                                    <h3>Main Course</h3>
                                    <p>Name: {lunch.mainCourse.mealName}</p>
                                </div>
                                <div className="lunch-info">
                                    <h3>Dessert</h3>
                                    <p>Name: {lunch.dessert.dessertName}</p>
                                </div>
                                <p className="total-price">
                                    Total Price: {lunch.mainCourse.mealPrice + lunch.dessert.dessertPrice}$
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pagination-controls">
                    <button onClick={this.goToPreviousPage} disabled={currentPage === 0}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button onClick={this.goToNextPage} disabled={currentPage >= totalPages - 1}>
                        Next
                    </button>
                </div>

            </div>
        );
    }
}

export default LunchesPanel;
