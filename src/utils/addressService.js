import axios from 'axios';

const BASE_URL = 'https://provinces.open-api.vn/api';

export const getProvinces = async () => {
  const response = await axios.get(`${BASE_URL}/p/`);
  const provinces = response.data;
  if (!provinces) {
    throw new Error('Provinces data is undefined.');
  }

  return provinces.map(province => ({
    code: province.code,
    name: province.name
  }));
};

export const getDistricts = async (provinceCode) => {
  const response = await axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
  const districts = response.data.districts;
  if (!districts) {
    throw new Error('Districts data is undefined.');
  }

  return districts.map(district => ({
    code: district.code,
    name: district.name
  }));
};

export const getWards = async (districtCode) => {
  const response = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
  const wards = response.data.wards;
  if (!wards) {
    throw new Error('Wards data is undefined.');
  }

  return wards.map(ward => ({
    code: ward.code,
    name: ward.name
  }));
};
