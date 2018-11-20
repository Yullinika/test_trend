import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.heandeChangeTextFilter = this.heandeChangeTextFilter.bind(this);
    }

    heandeChangeTextFilter = (e) => {
        this.props.onChangeTextFilter(e.target.value);
    };

    render() {
        return <div className="col-md-12">
            <div className="form-group"><br/>
            <input type="text" className="form-control" value={this.props.textFilter}
                   onChange={this.heandeChangeTextFilter}/>
            </div>
            <hr/>
        </div>
    }

}

export default SearchBar;