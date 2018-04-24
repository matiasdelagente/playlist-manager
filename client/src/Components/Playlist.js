import React, { Component } from 'react';

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      playlist: {}
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`/playlist/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ playlist: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { playlist } = this.state

    return (
      <div>
        {playlist &&
          <div className="container">
            <div className="row">
              <div className="mx-auto mt-5">
                <h1>{playlist.name}</h1>
                <p className="lead">{playlist.description}</p>
              </div>
            </div>

            <div className="col-md-10 offset-md-1">
              <p><i className="fas fa-user-circle"></i> {playlist.creator}</p>
              <p><i className="fas fa-eye"></i> {playlist.views}</p>
            </div>

            <div className="row">
              <div className="col-md-3 offset-md-9">
                <button type="button" className="btn btn-success">
                  Add new video
            </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10 offset-md-1 mt-5">
                <div className="card bg-light mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{playlist.name}</h5>
                    <span className="card-text">
                      <i className="fas fa-user-circle"></i> {playlist.creator}
                    </span>
                    <span className="card-text ml-5">
                      <i className="fas fa-eye"></i> {playlist.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>}
      </div>
    )
  }
}

export default Playlist