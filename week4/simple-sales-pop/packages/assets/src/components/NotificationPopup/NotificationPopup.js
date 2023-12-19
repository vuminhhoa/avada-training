import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';
import {truncateString} from '../../helpers/utils';
/**
 *
 * @param {*} param0
 * @returns
 */
export const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = `${new Date()}`,
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  settings = {hideTimeAgo: false, truncateProductName: false}
}) => {
  const {hideTimeAgo, truncateProductName} = settings;
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                purchased {truncateProductName ? truncateString(productName, 16) : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                {hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
