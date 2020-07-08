$(document).ready(function () {
  
  $("form .submit-btn").click(function (e) {
    e.preventDefault();
    //var newNode = JSON.stringify(jQuery('#contact-form').serializeArray());
    var formName = $('#name').val(),
        formEmail = $('#email').val(),
      formSubject = $('#subject').val(),
        formMessage = $("#message").val(),
        formPhone = $("#phone").val(),
        domainUrl = window.location.host,
        theURL = "";

    var newNode = {
      "contact_form": [{"target_id": "contact"}],
      "name": [{ "value": formName}],
      "mail": [{ "value": formEmail}],
      "subject": [{ "value": formSubject}],
      "message": [{ "value": formMessage}],
      "field_phone": [{ "value": formPhone}]
    }

    // if (domainUrl == 'dev-menus-birradev.pantheonsite.io') {
    //   theURL = 'http://dev-menus-birradev.pantheonsite.io/'
    // }else {
    //   theURL = 'detodo.menu'
    // }

    function getCsrfToken(callback) {
      jQuery
        .get('http://dev-menus-birradev.pantheonsite.io/session/token')
        .done(function (data) {
          var csrfToken = data;
          callback(csrfToken);
        });
    }

    function postNode(csrfToken, node) {
      jQuery.ajax({
        url: 'http://dev-menus-birradev.pantheonsite.io/entity/contact_message?_format=json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/hal+json',
          'X-CSRF-Token': csrfToken
        },
        data: JSON.stringify(node),
        success: function (node) {
          console.log(node);
        }
      });
    }

    getCsrfToken(function (csrfToken) {
      postNode(csrfToken, newNode);
    });
  });

});