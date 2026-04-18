import { useEffect, useState, useRef } from "react";

type LiveLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export function useLiveLocation() {
  const [location, setLocation] = useState<LiveLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device");
      setLoading(false);
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        setLocation((prev) => {
          // 🔥 Prevent unnecessary re-renders
          if (
            prev &&
            prev.latitude === latitude &&
            prev.longitude === longitude
          ) {
            return prev;
          }

          return {
            latitude,
            longitude,
            accuracy: accuracy ?? 0,
          };
        });

        setLoading(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable");
            break;
          case err.TIMEOUT:
            setError("Location request timed out");
            break;
          default:
            setError("Unknown location error");
        }

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { location, error, loading };
}