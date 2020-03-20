import React, {Component} from 'react';
import {Alert, Badge, Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {addComments, getComments, getOneNews} from "../../store/action/newsActions";
import {connect} from "react-redux";

class OneNews extends Component {
    state = {
        comments: ''
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    submitFormHandler = event => {
        event.preventDefault();
        this.props.addComments({...this.state, newsId: this.props.match.params.id}, this.props.match.params.id)

    };
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getOneNews(id);
        this.props.getComments(id)
    }

    render() {
        return (
            <Container>
                <h1><Badge color="secondary">{this.props.oneNews.title}</Badge></h1>
                <hr className="HRColor"/>
                <div>
                    <div>
                        <p><img
                            style={this.props.oneNews.image ? {height: "400px", float: 'left', margin: '25px'} : null}
                            src={this.props.oneNews.image ? 'http://localhost:8005/uploads/' + this.props.oneNews.image : null}
                            alt=""/>{this.props.oneNews.description}</p>
                    </div>
                </div>
                <hr className="HRColor"/>
                {this.props.comments && this.props.comments.map(item => (
                    <Alert key={item._id} color="secondary">
                        <span>Date: {item.datetime}</span>
                        <div><h4>Author: {item.user.username}</h4></div>
                        <p>Message: {item.comments}</p>
                    </Alert>
                ))}
                <hr className="HRColor"/>
                {this.props.user ? (
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="comments">Comment</Label>
                            <Input onChange={this.inputChangeHandler}
                                   type="textarea"
                                   name="comments"
                                   id="comments"/>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{offset: 2, size: 10}}>
                                <Button type='submit'>Create</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                ) : (
                    <h4>Log in to post a comment</h4>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        oneNews: state.newsReducers.oneNews,
        comments: state.newsReducers.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOneNews: (id) => dispatch(getOneNews(id)),
        addComments: (dataComments, id) => dispatch(addComments(dataComments, id)),
        getComments: (id) => dispatch(getComments(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OneNews);