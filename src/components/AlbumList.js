import React from 'react';
import Album from "./Album";
import AlbumInfo from "./AlbumInfo";

class AlbumsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadAlbums: false,
            albumsList: null,
            albumForOpen: null,
            nextPageToken: null
        };
        this.onOpenAlbum = this.onOpenAlbum.bind(this);
        this.onOpenAlbumInfo = this.onOpenAlbumInfo.bind(this);
        this.onCloseAlbumInfo = this.onCloseAlbumInfo.bind(this);
    }

    onOpenAlbumInfo = (album) => {
        this.setState({albumForOpen: album});
    };

    onCloseAlbumInfo = () => {
        this.setState({albumForOpen: null})
    };

    onOpenAlbum = () => {
        this.props.onTypePagePhotos('photos');
    };

    componentDidMount() {
        const oauthToken = localStorage.getItem('access_token');
        fetch('https://photoslibrary.googleapis.com/v1/albums' +
            '?access_token=' + encodeURIComponent(oauthToken)
        )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        albumsList: Object.values(result.albums),
                        nextPageToken: result.nextPageToken
                    });
                    // console.log(result);
                }
            );
    };

    render() {
        const albumsList = this.state.albumsList;
        if (albumsList == null) {
            return <div className="col-md-12">Loading...</div>
        }
        const elements = albumsList.filter(item => item.title.indexOf(this.props.filterText) >= 0).map(item => <Album
            key={item.id} elementInfo={item} onOpenAlbum={this.onOpenAlbum} onOpenAlbumInfo={this.onOpenAlbumInfo}/>);
        return <div>
            {elements}
            <AlbumInfo album={this.state.albumForOpen} onClose={this.onCloseAlbumInfo}/>
        </div>
    }
}

export default AlbumsList;