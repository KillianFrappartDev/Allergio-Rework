import sha1 from 'sha1';

// Local imports
import { CLOUDINARY_API, CLOUDINARY_SECRET, CLOUDINARY_URL } from './data';

const uploadHandler = e => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  formData.append('api_key', CLOUDINARY_API);
  formData.append('timestamp', Math.floor(Date.now() / 1000).toString());
  formData.append('signature', sha1(`timestamp=${Math.floor(Date.now() / 1000)}${CLOUDINARY_SECRET}`));

  let response;
  try {
    response = await axios.post(CLOUDINARY_URL, formData);
  } catch (error) {
    console.log('ERROR', error);
  }
  if (!response) return;
  return response.data.secure_url;
};

export default uploadHandler;
