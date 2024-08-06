import axios from 'axios';
export const getCordinates = async (
  city: string
): Promise<Array<number> | null> => {
  const baseUrl = 'https://nominatim.openstreetmap.org/search';
  const params = {
    q: city,
    format: 'json',
    limit: '1',
  };

  try {
    const response = await axios.get(baseUrl, { params });
    const data = response.data;

    if (data.length === 0) {
      throw new Error(`No results found for city: ${city}`);
    }

    const { lat, lon } = data[0];
    return [lat, lon];
  } catch (error) {
    console.error(error);
    return null;
  }
};
