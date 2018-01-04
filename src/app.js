import { Marker, Map, TileLayer} from "react-leaflet";
import React from "react";
import ReactDOM from "react-dom";
import L, { divIcon } from "leaflet";
const User = {
    name: "Marcos",
    places: [{
                name:"Work",
                position: {
                    lat: 39.9444071,
                    lng: -75.1631718}
            }, 
            {
                name: "Home",
                position: {
                    lat: 40.9175771,
                    lng: -73.70027209999999}
            }, 
            {
                name: "Mom's house",
                position: {
                    lat: 40.0583238,
                    lng: -74.4056612}
            }]
}
const Selected = User.places.map((place,index)=>(index===0));
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this); 
    }

    onClick(e) {
        e.preventDefault();
    }
    render() {
        let greenIcon = new L.divIcon({
            html: '<i class="fa fa-map-marker" aria-hidden="true"></i>'
        });
        return (
            <div className="map">
                <Map
                    style={{height: "140px", width: "208px"}}
                    center={this.props.position}
                    zoom={10}
                >
                    <TileLayer
                        url='https://api.mapbox.com/styles/v1/dimatiaz/cjbtwawe2b0i22rqyjh7eaicd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGltYXRpYXoiLCJhIjoiY2pidHcwemVpMWp2YzMzcXpqdnhuOTF1NSJ9.yJpX7I9yXLHQ3_ssy4qhLA'
                    />
                    <Marker 
                        position={this.props.position}
                        icon={greenIcon}
                        style={{height:"10px",width:"10px"}}
                    >
                    </Marker>
                </Map>
                <a href="#" onClick={this.onClick} className="blue-button">
                    <span>Continue</span> 
                    <i className="fa fa-arrow-right" aria-hidden="true">
                    </i>
                </a>
            </div>
        );
    }
}

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e){
        e.preventDefault();
        this.props.handleOnClick(this.props.index);
    }

    render() {
        return (
            <a href="#" onClick={this.onClick} className={this.props.selected}>
                {this.props.place}
            </a>    
        );
    }
}
class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: Selected
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    
    handleOnClick(index) {
        let selected = this.state.selected;
        selected = selected.map(()=> false);
        selected[index] = true;
        this.setState({selected: selected});
        this.props.handleOnClick(index);
    }
    render() { 
        return (
            <div className="intro">
                <h1>
                    Hola<br />
                    {User.name},
                </h1>
                <p>Where are you going today?</p>
                <div className="row">
                    {this.state.selected.map((select,index)=> {
                        return <Place place={User.places[index].name} key={index} index={index} selected={select ? "selected" : ""} handleOnClick={this.handleOnClick} />;
                    })}
                </div>
            </div>
        );
    }
}
class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <i className="fa fa-search" aria-hidden="true">
                </i>
                <input type="text" placeholder="Search a new place">
                </input>
            </div>
        );
    }
}
class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: User.places[0].position
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(index) {
        let position = User.places[index].position;
        this.setState({position: position});
    }
    render(){
        return (
            <div className="col container">
                <Search/>
                <Intro handleOnClick={this.handleOnClick} />
                <MapContainer position={this.state.position}/>
            </div>
        );
    }
}
class Iframe extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" src="http://www.woocation.com" frameborder="0"></iframe>
                <Widget />
            </div>
        );
    }
}
ReactDOM.render(<Iframe/>,document.getElementById("app"));