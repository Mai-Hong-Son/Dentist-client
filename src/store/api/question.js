import qs from 'qs';
import config from '../../constant';
import { API, withToken, generateBodyFile } from './common';

/* eslint-disable */

import RNFetchBlob from 'react-native-fetch-blob';

const hasScheme = url => (url.match(/^([a-z0-9]+):\/\//) || [])[1];

// function generateBodyFile(image) {
//   const filename = image.split('/').pop();
//   const extension = filename.split('.').pop();
//   const mimes = {
//     jpg: 'image/jpg',
//     png: 'image/png'
//   };

//   let processedImage = image;
//   if (image.startsWith('file://')) {
//     processedImage = image.slice(7);
//   }

//   return {
//     filename,
//     type: mimes[extension.toLowerCase()] ? mimes[extension.toLowerCase()] : '',
//     data: RNFetchBlob.wrap(processedImage)
//   };
// }

export default {
  // listQuestions2: (token, { page, page_size }) => {
  //   return new Promise(resolve => {
  //     resolve({
  //       ok: true,
  //       data: {
  //         items: [],
  //         total: 0
  //       }
  //     });
  //   });
  // },
  stageImage: async (token, { image }) => {
    const param = [
      {
        ...generateBodyFile(image),
        name: 'image'
      }
    ];

    try {
      const startRequest = Date.now();
      const resp = await RNFetchBlob.fetch(
        'POST',
        `${config.api}/questions/stage-image`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        param
      );
      // .progress({ count: 1 }, (received, total) => {
      //   // console.log('question.js progress', received / total, received, total);
      //   callback && callback(image, received, total);
      // });

      const endRequest = Date.now();
      const { status } = resp.info();

      let problem = '';
      if (status < 300) {
        problem = '';
      } else if (status < 500) {
        problem = 'CLIENT_ERROR';
      } else if (status < 600) {
        problem = 'SERVER_ERROR';
      }

      return {
        // ok      - Boolean - True is the status code is in the 200's; false otherwise.
        // problem - String  - One of 6 different values (see below - problem codes)

        // data     - Object - this is probably the thing you're after.
        // status   - Number - the HTTP response code
        // headers  - Object - the HTTP response headers
        // config   - Object - the `axios` config object used to make the request
        // duration - Number - the number of milliseconds it took to run this request
        ok: status <= 400,
        problem,
        data: resp.json(),
        status,
        headers: {},
        config: {},
        duration: endRequest - startRequest
      };
    } catch (e) {
      console.log('lỗi staging', e);
    }
  },

  listQuestions: (token, { page, page_size }) =>
    withToken(
      token,
      API.get,
      '/questions?' +
      qs.stringify({
        page,
        page_size,
        sorts: {
          id: -1
        }
      })
    ),

  questionDetail: (token, { id }) => withToken(token, API.get, `/questions/${id}`),

  createQuestion: (
    token,
    { title, service_id, service_issue_id, service_issue_detail_id, image, x_ray_image }
  ) =>
    withToken(token, API.post, 'questions', {
      service_id,
      service_issue_id,
      service_issue_detail_id,
      title,
      image_ids: image,
      x_ray_image_ids: x_ray_image,
      tmp_email: '',
      tmp_phone: '',
      adl1: 1,
      adl2: 1,
      adl3: 1
    })
  // const params = [
  //   { name: 'title', data: title },
  //   { name: 'service_id', data: service_id },
  //   { name: 'service_issue_id', data: service_issue_id },
  //   { name: 'service_issue_detail_id', data: service_issue_detail_id },
  //   { name: 'status', data: status }
  // ];
  // // image
  // image &&
  //   image.forEach(img => {
  //     params.push({
  //       ...generateBodyFile(img),
  //       name: 'image'
  //     });
  //   });
  // x_ray_image &&
  //   x_ray_image.forEach(img => {
  //     params.push({
  //       ...generateBodyFile(img),
  //       name: 'x_ray_image'
  //     });
  //   });
};
