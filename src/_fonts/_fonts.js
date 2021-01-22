import {createGlobalStyle} from 'styled-components';

import montserratBold from './montserratBold.tff';
import montserratMedium from './montserratMedium.tff';

export default createGlobalStyle`
@font-face {
    font-family: 'Font Name';
    src: local('Font Name'), local('FontName'),
    url(${montserratMedium}) format('montserrat');
    font-weight: 300;
    font-style: normal;
}
`