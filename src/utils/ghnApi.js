import axios from 'axios'; // Use ES6 import syntax

const ghnApi = axios.create({
  baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2',
  headers: {
    'Content-Type': 'application/json',
    'Token': process.env.REACT_APP_GHN_API_TOKEN,
    'ShopId': process.env.REACT_APP_GHN_STORE_ID,
  },
});

export const getAvailableServices = async (toDistrict) => {
  try {
    const response = await ghnApi.post('/shipping-order/available-services', {
      shop_id: parseInt(process.env.REACT_APP_GHN_STORE_ID),
      from_district: 1449, // District 7 of HCM
      to_district: toDistrict,
    });

    if (response.data.code !== 200) {
      throw new Error(response.data.msg || 'Failed to fetch shipping services');
    }
    return response.data.data;
  } catch (error) { 
    console.error('Error fetching GHN available services:', error.message);
    throw error;
  }
};

export const calculateFee = async (toDistrict, weight) => { // weight in grams
  try {
    const services = await getAvailableServices(toDistrict);
    const shippingFee = await ghnApi.post('/shipping-order/fee', {
      service_id: services[0].service_id,
      insurance_value: 500000,
      service_type_id: 1,
      coupon: null,
      from_district_id: 1449, // District 7 of HCM
      to_district_id: toDistrict,
      height: 15,
      length: 15,
      weight: weight,
      width: 15,
    });

    console.log(shippingFee.data);
    return shippingFee.data.data.total;
  } catch (error) {
    console.error('Error fetching GHN shipping fee:', error.message);
    throw error;
  }
};
