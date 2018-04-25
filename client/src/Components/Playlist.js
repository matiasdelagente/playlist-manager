import React, { Component } from 'react';

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      playlist: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch(`/playlist/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ playlist: data }))
      .catch(error => console.log(error));
  }

  handleSubmit(e) {
    e.preventDefault();

    const { id } = this.props.match.params;
    const formBody = {
      creator: this.creatorName.value,
      videoUrl: this.videoUrl.value,
      description: this.description.value,
    };

    fetch(`/playlist/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: 'POST',
      body: JSON.stringify(formBody),
    })
      .then(response => response.json())
      .then(data => {
        const videos = [...this.state.playlist.videos, data]
        const updatedPlayList = { ...this.state.playlist, videos: videos }

        this.setState({ playlist: updatedPlayList });

        document.getElementById("hidePopUpBtn").click();
        this.form.reset();
      })
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
                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                  Add new video
                </button>
              </div>
            </div>

            {playlist.videos && playlist.videos.map(video => (
              <div className="row my-5">
                <div className="col-md-4">
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${video.videoUrl}`}></iframe>
                  </div>
                </div>
                <div className="col-md-6 mt-2">
                  <p className="card-text">
                    <i className="fas fa-user-circle"></i> {video.creator}
                  </p>
                  <p className="card-text mt-5">
                    <i class="fas fa-link"></i> {`https://www.youtube.com/embed/${video.videoUrl}`}
                  </p>
                  <p className="card-text mt-5">
                     {video.description}
                  </p>
                </div>
                <hr />
              </div>
            ))}

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Video</h5>
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
                        <label for="exampleInputPassword1">Youtube ID (example: dQw4w9WgXcQ)</label>
                        <input type="text" className="form-control" ref={videoUrl => { this.videoUrl = videoUrl }} />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Description of the video</label>
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

          </div>}
      </div>
    )
  }
}

export default Playlist