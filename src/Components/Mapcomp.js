// src/Mapcomp.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const initialPosition = [15.149361, 76.920667]; // Ballari City

const Mapcomp = () => {
  const [position, setPosition] = useState(initialPosition);
  const [path, setPath] = useState([initialPosition]);

  // Simulate vehicle movement
  useEffect(() => {
    const route = [
      [15.142038, 76.918120],
      [15.148480, 76.901683],
      [15.160700, 76.890654]
    ];

    let index = 0;
    const interval = setInterval(() => {
      setPosition(route[index]);
      setPath((prevPath) => [...prevPath, route[index]]);
      index = (index + 1) % route.length;
    }, 3000); // Updates every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const vehicleIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/3202/3202926.png',
    iconSize: [38, 95],
  });

  return (
    <MapContainer center={position} zoom={14} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={position} icon={vehicleIcon} />
      <Polyline positions={path} color="red" />
    </MapContainer>
  );
};

export default Mapcomp;
