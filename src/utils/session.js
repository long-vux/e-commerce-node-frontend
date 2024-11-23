import Cookies from 'js-cookie';

const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getSessionId = () => {
  let sessionId = Cookies.get('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    Cookies.set('sessionId', sessionId, { expires: 7 }); // Set cookie for 7 days
  }
  return sessionId;
};

export const getUserId = () => {
  // Implement logic to get logged-in user's ID, e.g., from auth context or localStorage
  return localStorage.getItem('userId');
};
