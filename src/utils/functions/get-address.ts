import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyCRBupGQd8GRvDR7NTcmwkJblkLBknwTuw');
export const getAddress = (latitude: number, longitude: number) => {
  console.log('latitude', latitude);

  return new Promise((resolve, reject) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json', json);
        var formatted_address = json.results[0].formatted_address;
        console.log('formatted_address', formatted_address);

        var addressComponent = json.results[0].address_components;
        console.log('address', addressComponent);

        const addressComponent2 = json.results[0].address_components.find(
          component => component.types.includes('postal_code'),
        );
        const zipCode = addressComponent2 ? addressComponent2.long_name : '';
        console.log('Zip code:', zipCode);
        // get City
        let city = '';

        for (let i = 0; i < addressComponent.length; i++) {
          const component = addressComponent[i];
          const types = component.types;

          if (
            types.includes('locality') ||
            types.includes('administrative_area_level_1')
          ) {
            city = component.long_name;
            break;
          }
        }
        //get State
        let state = '';

        for (let i = 0; i < addressComponent.length; i++) {
          const component = addressComponent[i];
          const types = component.types;

          if (types.includes('administrative_area_level_1')) {
            state = component.long_name;
            break;
          }
        }

        let rAddress = {
          address: formatted_address,
          zipCode: zipCode,
          city: city,
          state: state,
        };
        resolve(rAddress);
      })
      .catch(error => {
        console.warn(error);
        reject(error);
      });
  });
};
