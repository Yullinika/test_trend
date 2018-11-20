import React from 'react';
import Photo from "./Photo";

class PhotosList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadPhotos: false,
            photosList: [],
            nextPageToken: null
        };
        this.onBackToAlbums = this.onBackToAlbums.bind(this);
        this.onLoadNextPage = this.onLoadNextPage.bind(this);
    }

    onBackToAlbums = () => {
        this.props.onTypePageAlbums('albums');
    };
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
        if(!this.state.nextPageToken){
            const oauthToken = localStorage.getItem('access_token');
            const albumId = localStorage.getItem('albumId');
            console.log("albumId = ", albumId);
            fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search?albumId=' + albumId,{
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
                            photosList: Object.values(result.mediaItems),
                            nextPageToken: result.nextPageToken
                        });

                    },
                    (error) => {

                    }
                );
        }

    };

    render(){
        const photosList = this.state.photosList;
        console.log("photosList = ",photosList);
        if(photosList == null){
            return <div>Loading...</div>;
        }
        const elements = photosList.map(item => <Photo key={item.id} elementUrl={item}/>);
        const viewMore = this.state.nextPageToken ? <div className="col-xs-4 col-sm-3 col-md-3"> <button className="btn btn-default" onClick={this.onLoadNextPage}>Показать еще</button></div>: null;
        return <div className="row">
            <div className="col-md-12">
                <div className="form-group"><br/>
                    <button className="btn btn-default" onClick={this.onBackToAlbums}>Назад к альбомам</button>
                </div>
                <hr/>
            </div>
            <div className="col-md-12">
                <div className="row">
                    {elements}
                    {viewMore}
                </div>
            </div>
        </div>;

    }
}

export default PhotosList;