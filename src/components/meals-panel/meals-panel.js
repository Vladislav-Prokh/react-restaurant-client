import React, {Component} from "react";
import MenuService from "../services/MenuService";
import "./meals-panel.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class MealsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            currentPage: 0,
            totalPages: 0,
            error: null,
        };
    }

    async componentDidMount() {
        await this.loadMeals(0,4);
    }

    loadMeals = async (page) => {
        try {
            const { getMeals } = MenuService.getState();
            await getMeals(page, 4);
            const { meals, currentPage, totalPages } = MenuService.getState();
            this.setState({ meals, currentPage, totalPages });
        } catch (error) {
            this.setState({ error: "An error occurred while fetching lunches" });
        }
    };

    goToPreviousPage = async () => {
        const { currentPage } = this.state;
        if (currentPage > 0) {
            await this.loadMeals(currentPage - 1);
        }
    };

    goToNextPage = async () => {
        const { currentPage, totalPages } = this.state;
        if (currentPage < totalPages - 1) {
            await this.loadMeals(currentPage + 1);
        }
    };

    render() {
        const { meals, currentPage, totalPages } = this.state;

        return (
            <div>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"/>
                <div className="meals-content">
                    <div className="meals-container">
                        {
                            meals.map((meal,index) => (
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="https://media.istockphoto.com/id/1189709277/photo/pasta-penne-with-roasted-tomato-sauce-mozzarella-cheese-grey-stone-background-top-view.jpg?s=612x612&w=0&k=20&c=5ro7Cvwx79tWpyN1r2hy3DwplFi5FuPrD_4DYD8tZpg=" />
                                    <Card.Body>
                                        <Card.Title>{meal.mealName}</Card.Title>
                                        <Card.Text>
                                            {meal.description}
                                        </Card.Text>
                                        <Button variant="danger">delete</Button>
                                    </Card.Body>
                                </Card>

                            ))
                        }
                    </div>
                </div>

                <div className="pagination-controls">
                    <button onClick={this.goToPreviousPage}  disabled={currentPage === 0}>Previous</button>
                    <span>Page {currentPage+1} of {totalPages}</span>
                    <button onClick={this.goToNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
                </div>
            </div>

        );
    }

}

export default MealsPanel;
