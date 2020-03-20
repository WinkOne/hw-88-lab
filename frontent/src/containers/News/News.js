import React, {Component} from 'react';
import {Button, Card, Container, Media} from "reactstrap";
import {connect} from "react-redux";
import {getNews} from "../../store/action/newsActions";
import notImage from "../../assets/images/chat.png"
import next from "../../assets/images/forward (1).png"
import moment from "moment";


class News extends Component {
    componentDidMount() {
        this.props.getNews()
    }
    pushHandler = (id) => {
      this.props.history.push('/' + id)
    };

    render() {
        return (
            <Container>
                <h1>News</h1>
                <hr className="HRColor"/>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {this.props.news && this.props.news.map(item => (
                        <Card
                            // onClick={() => this.watchAlbumHandler(item._id)}
                            key={item._id}
                            style={{
                                width: '48%',
                                margin: '10px',
                                border: '1px solid #888'
                            }}
                        >
                            <Media>
                                <Media left>
                                    <Media style={{
                                        width: '200px',
                                        height: '180px'
                                    }}
                                           object
                                           src={item.image ? 'http://localhost:8005/uploads/' + item.image : notImage}
                                    />
                                </Media>
                                <Media body style={{margin: "0 3%"}}>
                                    <Media heading>
                                        {item.title}
                                    </Media>
                                    {moment(item.datetime).format('MMMM Do YYYY, h:mm:ss')}
                                </Media>
                                <Button onClick={() => this.pushHandler(item._id)} style={{border: 'none'}} outline color="secondary"><img src={next} alt={"Read Post"}/></Button>
                            </Media>
                        </Card>
                    ))}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        news: state.newsReducers.news
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getNews: () => dispatch(getNews())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(News);