import L from 'leaflet'

export const DefaultIcon = L.icon({
    iconUrl: '/marker-icon.png',
    // iconRetinaUrl: '/marker-icon-2x.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
})

L.Marker.prototype.options.icon = DefaultIcon;