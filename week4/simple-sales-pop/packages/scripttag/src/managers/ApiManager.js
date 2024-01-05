import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const BASE_URL = `http://localhost:5000/clientApi/notifications?shopifyDomain=${shopifyDomain}`;

    const data = await makeRequest(BASE_URL);
    return data.data;
  };
}
