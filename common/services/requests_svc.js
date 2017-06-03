/**
 * @Author: yxp
 * @Date:   2017-05-31 16:05:31
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-02 19:06:20
 */
export default {
    moviesShowingReq: 'https://api.douban.com/v2/movie/in_theaters',
    moviesTopReq: 'https://api.douban.com/v2/movie/top250',
    movieReq: 'https://api.douban.com/v2/movie/subject/:id',
    movieReviewsReq: 'https://api.douban.com/v2/movie/subject/:id/reviews',
    movieCommentsReq: 'https://api.douban.com/v2/movie/subject/:id/comments',
}

export function resource(url, params = {}) {
   const _url = url.replace(/\/:(\w+)/g, function (m, p1) {
       var value = params[p1];
       if (value) {
           delete params[p1];
           return '/' + value;
       } else {
           return m;
       }
   });
   return fetch(_url).then(response => response.json());
}
