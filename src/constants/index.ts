export const DEVICE_API_URL =
  process.env.REACT_APP_REST_URL !== undefined
    ? `${process.env.REACT_APP_REST_URL}/api/v1/`
    : `${window.location.origin}/api/v1`;
