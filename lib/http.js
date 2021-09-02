const axios = require('axios');
axios.interceptors.response.use(res=> res.data);
/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
    return axios.get(`https://api.github.com/repos/liling0726/react-webpack-template/tags`)
}

module.exports = {
    getTagList
}

