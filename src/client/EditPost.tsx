import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


class EditPost extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }


    async componentDidMount() {
        try {
            let r = await fetch(`/api/blogs/${this.props.match.params.id}`);
            let blog = await r.json();
            this.setState({ title: blog.title, content: blog.content });
        } catch (error) {
            console.log(error);
        }
    }

    deleteChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch(`/api/blogs/${this.props.match.params.id}`, {
            method: 'DELETE'
        })
            .then(() => this.props.history.push('/'));
    };

    editChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch(`/api/blogs/${this.props.match.params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ title: this.state.title, content: this.state.content }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => this.props.history.push('/'));
            
    };

    render() {
        return (
            <div className="container my-5">
                <div className="mx-auto w-50 p-3 bg-light border shadow-lg rounded">
                    <form>
                        <div className="form-group">
                            <label htmlFor="location">Title</label>
                            <input type="text" className="form-control" id="location" defaultValue={this.state.title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })}

                            />
                            <label htmlFor="commentText">Insert comment here</label>
                            <textarea className="form-control" rows={6} defaultValue={this.state.content}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ content: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-outline-info mr-1" onClick={this.editChirp}>
                                Submit Edits
                            </button>
                            <button className="btn btn-outline-danger" onClick={this.deleteChirp}>
                                Delete Blog
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}



export interface IAppProps extends RouteComponentProps<{ id: string }> { }

export interface IAppState {
    title: string;
    content: string;
}

export default EditPost;


