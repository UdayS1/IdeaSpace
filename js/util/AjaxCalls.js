define(['jquery', 'knockout'], function ($, ko) {

  var util = {};

  util.GET = function (url) {
    return new Promise((resolve) => {
      $.ajax(url, {
        method: "GET",
        contentType: "application/json",
        success: function (data) {
          resolve(data);
        }

      });

    });


  };

  util.PUT = async function (url, dataToBeSend) {
    return new Promise(resolve => {
      $.ajax(url, {
        data: dataToBeSend,
        method: "PUT",
        contentType: "application/json",
        success: resolve()
      });
    });
  };

  util.POST = async function (url, nodeName) {
    return new Promise(resolve => {
      $.ajax(url, {
        data: nodeName,
        method: "post",
        contentType: "application/json",
        success: resolve(data)
      });
    });
  };

  return {
    getUtil: function () {
      return util;
    }
  }
})