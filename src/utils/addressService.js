// import axios from 'axios';

// const BASE_URL = 'https://provinces.open-api.vn/api';

// export const getProvinces = async () => {
//   const response = await axios.get(`${BASE_URL}/p/`);
//   const provinces = response.data;
//   if (!provinces) {
//     throw new Error('Provinces data is undefined.');
//   }

//   return provinces.map(province => ({
//     code: province.code,
//     name: province.name
//   }));
// };

// export const getDistricts = async (provinceCode) => {
//   const response = await axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
//   const districts = response.data.districts;
//   if (!districts) {
//     throw new Error('Districts data is undefined.');
//   }

//   return districts.map(district => ({
//     code: district.code,
//     name: district.name
//   }));
// };

// export const getWards = async (districtCode) => {
//   const response = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
//   const wards = response.data.wards;
//   if (!wards) {
//     throw new Error('Wards data is undefined.');
//   }

//   return wards.map(ward => ({
//     code: ward.code,
//     name: ward.name
//   }));
// };


import axios from 'axios';

const BASE_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api';

const TOKEN = process.env.REACT_APP_GHN_API_TOKEN
export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/master-data/province`, {
      headers: {
        'Content-Type': 'application/json',
        'token': TOKEN,
      },
    });
    return response.data.data.map(item => ({
      provinceID: item.ProvinceID,
      provinceName: item.ProvinceName
    })); // Danh sách tỉnh
  } catch (error) {
    console.error(error);
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/master-data/district`, {
      headers: {
        'Content-Type': 'application/json',
        'token': TOKEN,
      },
      params: {
        province_id: provinceId,
      },
    });
    return response.data.data.map(item => ({
      districtID: item.DistrictID,
      districtName: item.DistrictName
    })); // Danh sách huyện/quận
  } catch (error) {
    console.error(error);
  }
};

export const getWards = async (districtId) => {
  try {
    const response = await axios.post(`${BASE_URL}/master-data/ward`, {
      district_id: districtId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': TOKEN,
      },
    });
    return response.data.data.map(item => ({
      wardCode: item.WardCode,
      wardName: item.WardName
    })); // Danh sách phường/xã
  } catch (error) {
    console.error(error);
  }
};


