import React from 'react';
import './NoticationPopup.scss';
import {truncateString} from '../../../../assets/src/helpers/utils';
import moment from 'moment';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  hideTimeAgo = false,
  truncateProductName = false
}) => {
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
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                purchased {truncateProductName ? truncateString(productName, 16) : productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <div>{hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}</div>
                <div className="uni-blue checkmark">by Avada</div>
              </div>
              <button
                className="close-button"
                onClick={() => document.querySelector('#Avada-SalePop').remove('fade-in')}
              >
                &#10006;
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
