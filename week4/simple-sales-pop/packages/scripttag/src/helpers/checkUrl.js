export default function checkUrlAllowShow({url, allowShow, includedUrls, excludedUrls}) {
  const excludedUrlsArr = excludedUrls
    .replace(/\s/g, ' ')
    .split(' ')
    .filter(url => url !== '');

  const includedUrlsArr = includedUrls
    .replace(/\s/g, ' ')
    .split(' ')
    .filter(url => url !== '');
  if (
    (allowShow === 'all' && !excludedUrlsArr.includes(url)) ||
    (allowShow === 'specific' && !includedUrlsArr.includes(url) && includedUrls.includes(url))
  ) {
    return true;
  }
  return false;
}
