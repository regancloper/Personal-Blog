import * as React from 'react';
import './scss/app';
import { RouteComponentProps } from 'react-router-dom';
import * as moment from 'moment';

class Details extends React.Component<IAppProps, IAppState> {
    state = {
        blog: {
            title: '',
            content: '',
            _created: '',
            author: '',
            tag: ''
        }
    };

    async componentDidMount() {
        try {
            let r = await fetch(`/api/blogs/${this.props.match.params.id}`);
            let blog = await r.json();
            this.setState({ blog });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="container my-5">
                <div className="d-flex align-items-center">
                    <h1>{this.state.blog.title}</h1>
                    <span className="badge badge-primary mx-3">{this.state.blog.tag}</span>
                </div>

                <p className="font-weight-light font-italic">Written by {this.state.blog.author}</p>
                <p>{this.state.blog.content}</p>
                <p className="font-italic font-weight-lighter small-font">Posted on {moment(this.state.blog._created).utc().format("dddd, MMMM Do, YYYY")}</p>


                <button className="btn btn-outline-secondary" onClick={() => this.props.history.push('/')}>
                    Go Back
                    </button>
                <button className="btn btn-outline-info mx-1" onClick={() => this.props.history.push(`/edit/${this.props.match.params.id}`)}>
                    Edit
                    </button>


            </div>
        );
    }
}

export interface IAppProps extends RouteComponentProps<{ id: string }> { }

export interface IAppState {
    blog: { title: string, content: string, _created: string, author: string, tag: string };
}

export default Details;
