import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import axios from "axios";

const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    {
      ssr: false,
    }
  );
  
  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    {
      ssr: false,
    }
  );
  
  const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    {
      ssr: false,
    }
  );
  
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  });

  export function LocationMap({
    locX,
    setLocX,
    locY,
    setLocY,
    locName,
    setLocName,
  }: {
    locX: number;
    setLocX: Dispatch<SetStateAction<number>>;
    locY: number;
    setLocY: Dispatch<SetStateAction<number>>;
    locName: string;
    setLocName: Dispatch<SetStateAction<string>>;
  }) {
    let markerIcon : L.Icon;

    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      markerIcon = new L.Icon({
          iconUrl: '/marker-icon-2x.png',
          shadowUrl: '/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -38]
      });
    }  

    const [position, setPosition] = useState<L.LatLng | null>(null);

    useEffect(() => {
      import("leaflet").then((L) => {
        if (locX === 0 && locY === 0) {
          setPosition(null);
        } else {
          setPosition(new L.LatLng(locX, locY));
        }
      });
    }, [locX, locY]);
  
    const MyMapEvents: React.FC = () => {
      const map = useMap();
  
      useEffect(() => {
        if (position !== null) {
          map.setView(position, map.getZoom());
        }
      }, [position, map]);
  
      useMapEvents({
        click(e) {
          const { lat, lng } = e.latlng;
          setPosition(e.latlng);
          setLocX(lat);
          setLocY(lng);
          console.log(`Wybrane współrzędne: ${lat}, ${lng}`);
          axios
            .get(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            )
            .then((response) => {
              const address = response.data.address;
              const streetNumber = address.house_number || "";
              const streetName = address.road || "";
              const city = address.city || address.town || address.village || "";
              const name = streetNumber
                ? `${streetName} ${streetNumber}, ${city}`
                : `${streetName}, ${city}`;
  
              setLocName(name);
              console.log(`Nazwa miejsca: ${locName}`);
            })
            .catch((error) => {
              console.error("Błąd pobierania nazwy miejsca:", error);
            });
        },
      });
  
      return position ? (
        <Marker position={position} icon={markerIcon}>
          <Popup>Wybrana lokalizacja: {locName}</Popup>
        </Marker>
      ) : null;
    };
  
    return (
      <MapContainer
        center={[50.04370714836096, 22.00386841259957]}
        zoom={15}
        className="w-full h-96 rounded"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MyMapEvents />
      </MapContainer>
    );
  }