import React, { Component } from 'react';
let image_link = process.env.REACT_APP_CLOUDINARY_IMAGE_URL;

class AllUsers extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        fetch('/user/all')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    handleDeleteAll = () => {
        fetch('/user/deleteAll', { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Fetch updated list of users after deletion
                this.componentDidMount();
            })
            .catch(error => {
                console.error('Error deleting users:', error);
            });
    };

    render() {
        const { users } = this.state;
        return (
            <div>
                <h2>All Users</h2>
                <button onClick={this.handleDeleteAll}>Delete All Users</button>
                <a href={`${process.env.REACT_APP_BACKEND_SERVER_URL}database/setup`}>
                    <button>Setup Database</button>
                </a>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <strong>Username:</strong> {user.username} <br />
                                <img className='userListImage' src={`${image_link+user.profileImage+'.jpg'}`} alt={`Profile of ${user.username}`} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h1>No users</h1>
                )}
            </div>
        );
    }
}

export default AllUsers;
