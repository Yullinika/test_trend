import React from 'react';
import Photo from "./Photo";

class AlbumInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadPhotos: false,
            photosList: null,
            nextPageToken: null
        };
        this.onLoadNextPage = this.onLoadNextPage.bind(this);
    }
    onLoadNextPage(){
        const oauthToken = localStorage.getItem('access_token');
        const albumId = localStorage.getItem('albumId');
        const nextPage = this.state.nextPageToken;
        fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search?albumId=' + albumId+'&pageToken='+nextPage,{
                method: 'post',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + oauthToken
                }
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoadPhotos: true,
                        photosList: this.state.photosList.concat(Object.values(result.mediaItems)),
                        nextPageToken: result.nextPageToken
                    });
                },
                (error) => {

                }
            );
    }
    componentDidMount() {
        const oauthToken = localStorage.getItem('access_token');
        const albumId = localStorage.getItem('albumId');
        if(!this.state.nextPageToken) {
            fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search?albumId=' + albumId, {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + oauthToken
                    }
                }
            )
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoadPhotos: true,
                            photosList: Object.values(result.mediaItems),
                            nextPageToken: result.nextPageToken
                        });

                    },
                    (error) => {

                    }
                );
        }
    };
    render() {
        if (!this.props.album) {
            return null;
        }
        const photosList = this.state.photosList;
        const elements = photosList.map(item => <Photo key={item.id} elementUrl={item}/>);
        const viewMore = this.state.nextPageToken ? <div className="col-xs-4 col-sm-3 col-md-3"> <button className="btn btn-default" onClick={this.onLoadNextPage}>Показать еще</button></div>: null;
        return <div className='popup'>
            <div className='popup_inner modal in'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.props.onClose}>&times;</button>
                            <h4 className="modal-title">{this.props.album.title}</h4>
                            <ul className='list-unstyled'>
                                <li><span>mediaItemsCount: </span>{this.props.album.mediaItemsCount}</li>
                            </ul>
                        </div>
                        <div className="modal-body clearfix">
                            <div className='row'>
                                {elements}
                                {viewMore}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }
}

export default AlbumInfo;