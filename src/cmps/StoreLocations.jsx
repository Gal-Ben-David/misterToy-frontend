import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

export function StoreLocations() {
    const [center, setCenter] = useState({ lat: 32.068160, lng: 34.822548 })
    const zoom = 11

    function onMapClicked({ lat, lng }) {
        // console.log('click!', lat, lng)
        setCenter({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <section className="locations">
            <h2>Where Magic Happens</h2>
            <div className="store-locations">
                <div className="locations-buttons">
                    <button className="btn btn-location" onClick={() => onMapClicked({ lat: 32.068160, lng: 34.822548 })}>Ramat Gan</button>
                    <button className="btn btn-location" onClick={() => onMapClicked({ lat: 32.07484324375375, lng: 34.774144954225775 })}>Bograshov, Tel Aviv</button>
                    <button className="btn btn-location" onClick={() => onMapClicked({ lat: 32.094571, lng: 34.776700 })}>Dizengoff, Tel Aviv</button>
                    <button className="btn btn-location" onClick={() => onMapClicked({ lat: 32.07427776577913, lng: 34.80895441202367 })}>Giv'atayim</button>
                    <button className="btn btn-location" onClick={() => onMapClicked({ lat: 32.17143850675182, lng: 34.80159361895732 })}>Herzeliya</button>
                    <button className="btn btn-location" onClick={() => onMapClicked({ lat: 32.01764270237933, lng: 34.78037978989864 })}>Holon</button>
                </div>

                <div className="google-map" style={{ height: '50vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                        center={center}
                        defaultZoom={zoom}
                    >
                        <AnyReactComponent
                            {...center}
                            text="🧸"
                            onClick={onMapClicked}
                        />
                        <AnyReactComponent
                            lat={32.07484324375375}
                            lng={34.774144954225775}
                            text="🧸"
                            onClick={onMapClicked}
                        />
                        <AnyReactComponent
                            lat={32.094571}
                            lng={34.776700}
                            text="🧸"
                            onClick={onMapClicked}
                        />
                        <AnyReactComponent
                            lat={32.07427776577913}
                            lng={34.80895441202367}
                            text="🧸"
                            onClick={onMapClicked}
                        />
                        <AnyReactComponent
                            lat={32.17143850675182}
                            lng={34.80159361895732}
                            text="🧸"
                            onClick={onMapClicked}
                        />
                        <AnyReactComponent
                            lat={32.01764270237933}
                            lng={34.78037978989864}
                            text="🧸"
                            onClick={onMapClicked}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        </section>
    )
}

// click! 32.07484324375375 34.774144954225775
// click! 32.074076728132425 34.80841088946219
// click! 32.09083969138697 34.77570312423239
// click! 32.07427776577913 34.80895441202367
// click! 32.17143850675182 34.80159361895732
// click! 32.01764270237933 34.78037978989864