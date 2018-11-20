import React, {Component} from 'react';
import {GoogleAPI, GoogleLogin, GoogleLogout, googleGetAuthResponse} from 'react-google-oauth'
import AlbumsList from "./AlbumList";
import PhotosList from "./PhotoList";
import SearchBar from "./SearchBar";


class GoogleAPIs extends Component {
    constructor(props) {
        super(props);
        this.clientId = "600756880051-t2quk096og52s9i6h4vv7ugg7ael46kr.apps.googleusercontent.com";
        this.scope = 'https://www.googleapis.com/auth/photoslibrary.readonly';
        this.googleAuth = localStorage.getItem('access_token') || false;
        this.state = {
            typePage: localStorage.getItem('typePage') || "albums",
            isAuth: this.googleAuth,
            filterText: ''
        };
        this.authSuccess = this.authSuccess.bind(this);
        this.onTypePageChange = this.onTypePageChange.bind(this);

    };

    onTypePageChange = (typePage) => {
        this.setState({typePage: typePage});
        localStorage.setItem('typePage', typePage);
    };

    onChangeFilterText = (filterText) => {
        this.setState({filterText: filterText});
    };

    authSuccess = function () {
        this.googleAuth = googleGetAuthResponse();
        const oauthToken = this.googleAuth.accessToken;
        localStorage.setItem('access_token', oauthToken);
        sessionStorage.setItem('session_auth', 'true');
        localStorage.setItem('typePage', "albums");
        this.setState({
            isAuth: true
        });
    };

    render() {
        const sessionAuth = sessionStorage.getItem('session_auth') || false;
        if (!sessionAuth) {
            return <GoogleAPI clientId={this.clientId} scope={this.scope}>
                <div>
                    <div><GoogleLogin onLoginSuccess={this.authSuccess.bind(this)}/>
                    </div>
                    <div><GoogleLogout/></div>
                </div>
            </GoogleAPI>;
        } else {
            if (this.state.typePage === 'albums') {
                return <div>
                    <SearchBar filterText={this.state.filterText} onChangeTextFilter={this.onChangeFilterText}/>
                    <AlbumsList filterText={this.state.filterText} onTypePagePhotos={this.onTypePageChange}/>
                    </div>

            } else {
                return <PhotosList onTypePageAlbums={this.onTypePageChange}/>
            }
        }
    }
}


export default GoogleAPIs;