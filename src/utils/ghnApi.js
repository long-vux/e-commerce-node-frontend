const axios = require('axios')
require('dotenv').config()

const ghnApi = axios.create({
  baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2',
  headers: {
    'Content-Type': 'application/json',
    'token': process.env.REACT_APP_GHN_API_TOKEN,
  },
})

/**
 * Fetch available shipping services from GHN.
 * @param {number} fromDistrict - The origin district ID.
 * @param {number} toDistrict - The destination district ID.
 * @returns {Promise<Object>} - Available shipping services.
 */
const getAvailableServices = async (toDistrict) => {
  try {
    const response = await ghnApi.post('/shipping-order/available-services', {
      shop_id: process.env.REACT_APP_GHN_STORE_ID,
      from_district: 1449, // District 7 of HCM
      to_district: toDistrict,  
    })

    if (response.data.code !== 200) {
      throw new Error(response.data.msg || 'Failed to fetch shipping services')
    }

    return response.data.data.servicetypes
  } catch (error) {
    console.error('Error fetching GHN available services:', error.message)
    throw error
  }
}

module.exports = {
  getAvailableServices,
}