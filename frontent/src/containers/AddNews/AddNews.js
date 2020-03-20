import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Redirect} from "react-router-dom";
import {addNews} from "../../store/action/newsActions";

class AddNews extends Component {
    state = {
        title: '',
        description: '',
        image: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            if (key === 'description') {
                value = JSON.stringify(value);
            }

            formData.append(key, value);
        });

        this.props.addNews(formData);
    };

    render() {
        if (!this.props.user) {
            return <Redirect to='/login'/>
        } else {
            return (
                <Container>
                    <h1>Add News</h1>
                    <hr className="HRColor"/>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input onChange={this.inputChangeHandler}
                                   type="text"
                                   name="title"
                                   id="title"
                                   placeholder="with a placeholder"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Text</Label>
                            <Input onChange={this.inputChangeHandler}
                                   type="textarea"
                                   name="description"
                                   id="description"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={this.fileChangeHandler}
                                />
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{offset: 2, size: 10}}>
                                <Button type='submit'>Create</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        addNews: (newsData) => dispatch(addNews(newsData))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);