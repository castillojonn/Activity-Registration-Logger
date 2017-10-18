import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPage: 'documents', currentPageProps: null };
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    setCurrentPage(event, { page, props }) {
        if (event) event.preventDefault();
        this.setState({ currentPage: page, currentPageProps: props });
    }

    currentPage() {
        return {
            index: <Index />,
            documents: <Documents />,
            newDocument: <NewDocument />,
            editDocument: <EditDocument />,
            viewDocument: <ViewDocument />,
        }[this.state.currentPage];
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <AppNavigation
                    currentPage={ this.state.currentPage }
                    setCurrentPage={ this.setCurrentPage }
                    />
                <Grid>
                {
                    Meteor.userId() ?
                    React.cloneElement(this.currentPage(), {
                        setCurrentPage: this.setCurrentPage,
                        currentPage: this.state.currentPage,
                        ...this.state.currentPageProps,
                    }) : children
                }
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
};
