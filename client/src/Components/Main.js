import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      playlists: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch('/playlist')
      .then(response => response.json())
      .then(data => this.setState({ playlists: data }))
      .catch(error => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();

    const formBody = {
      creator: this.creatorName.value,
      name: this.playlistName.value,
      description: this.description.value,
    };

    fetch('/playlist', {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(formBody),
    })
      .then(response => response.json())
      .then(data => {
        const playlists = [...this.state.playlists, data]
        document.getElementById("hidePopUpBtn").click();
        this.form.reset();
        this.setState({ playlists: playlists });
      })
  }

  render() {
    const { playlists } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="mx-auto mt-5">
            <h1>Playlist Manager</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 offset-md-9 mt-5">
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
              Create New playlist
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1 mt-5">
            {playlists.map(playlist => (
              <Link to={`/playlists/${playlist._id}`} key={playlist._id}>
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
              </Link>
            ))}
          </div>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Playlist</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit} ref={form => this.form = form}>
                  <div className="form-group" >
                    <label for="exampleInputEmail1">Name of the creator</label>
                    <input type="text" className="form-control" ref={creatorName => { this.creatorName = creatorName }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Name of the Playlist</label>
                    <input type="text" className="form-control" ref={playlistName => { this.playlistName = playlistName }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Description of the Playlist</label>
                    <input type="text" className="form-control" ref={description => { this.description = description }} />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button id="hidePopUpBtn" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main;