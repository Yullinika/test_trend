import React from 'react';
import PhotosList from "./PhotoList";

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadPhoto: false
        };
        this.loadPhotos = this.loadPhotos.bind(this);
        this.openAlbumInfo = this.openAlbumInfo.bind(this);
    }

    loadPhotos = function() {
        localStorage.setItem('albumId', this.props.elementInfo.id);
        this.props.onOpenAlbum();
        this.setState({
            isLoadPhotos: true
        });
    };

    openAlbumInfo = () => {
       this.props.onOpenAlbumInfo(this.props.elementInfo);
    };

    render(){
        const albumInfo = this.props.elementInfo;
        const bgSrc = albumInfo.coverPhotoBaseUrl;
        const bgStyle = {
            backgroundImage: "url(" + bgSrc + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'noRepeat'
        };

        if(!this.state.isLoadPhotos){
            return <div className="col-sm-6 col-md-4">
                <div className="thumbnail album" onClick={this.openAlbumInfo}>
                    <div className="album_img" style={ bgStyle }/>
                    <div className="caption album_caption">
                        <h4>{albumInfo.title}</h4>
                        <h5><span className="glyphicon glyphicon-picture"></span> {albumInfo.mediaItemsCount}</h5>
                        <button className="btn btn-default" onClick={this.loadPhotos}>Смотреть фото</button>
                    </div>
                </div>
            </div>
        } else {
            return <PhotosList onTypePageAlbums={this.onTypePageChange}/>
        }

    }
}

export default Album;