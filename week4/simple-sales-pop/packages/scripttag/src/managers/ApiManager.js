import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;

    const data = await makeRequest(
      `http://${process.env.BASE_URL}/clientApi/notifications?shopifyDomain=${shopifyDomain}`
    );
    return data.data;
  };
}
