import React from 'react';
import './App.css';
import { Multiselect } from './Multiselect';

function App() {
  return (
    <div style={{ width: '400px', margin: '200px auto' }}>
      <Multiselect
        multiselectContainerClass={'top'}
        placeholder='Выберите страны'
        options={['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cura?ao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'R?union', 'Romania', 'Russia', 'Rwanda', 'Saint Barth?lemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'S?o Tom? and Pr?ncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe']}
      />

      <Multiselect
        multiselectContainerClass={'bottom'}
        placeholder='Рандомные опции'
        options={[
          'option-1',
          'option-2',
          'option-3',
          'option-4',
          'option-5',
          'option-6',
          'option-7',
          'option-8',
          'option-9',
          'option-10',
          'option-11',
          'option-12',
          'option-13',
          'option-14',
          'option-15',
          'option-16',
          'option-17',
          'option-18',
          'option-19',
          'option-20',
          'option-21',
          'option-22',
          'option-23',
          'option-24',
          'option-25',
          'option-26',
          'option-27',
          'option-28',
          'option-29',
          'option-30',
          'option-31',
          'option-32',
          'option-33',
          'option-34',
          'option-35',
          'option-36',
          'option-37',
          'option-38',
          'option-39',
          'option-40',
          'option-41',
          'option-42',
          'option-43',
          'option-44',
          'option-45',
          'option-46',
          'option-47',
          'option-48',
          'option-49',
          'option-50',
          'option-51',
          'option-52',
          'option-53',
          'option-54',
          'option-55',
          'option-56',
          'option-57',
          'option-58',
          'option-59',
          'option-60',
          'option-61',
          'option-62',
          'option-63',
          'option-64',
          'option-65',
          'option-66',
          'option-67',
          'option-68',
          'option-69',
          'option-70',
          'option-71',
          'option-72',
          'option-73',
          'option-74',
          'option-75',
          'option-76',
          'option-77',
          'option-78',
          'option-79',
          'option-80',
          'option-81',
          'option-82',
          'option-83',
          'option-84',
          'option-85',
          'option-86',
          'option-87',
          'option-88',
          'option-89',
          'option-90',
          'option-91',
          'option-92',
          'option-93',
          'option-94',
          'option-95',
          'option-96',
          'option-97',
          'option-98',
          'option-99',
          'option-100',
        ]}
      />
    </div>
  );
}

export default App;
