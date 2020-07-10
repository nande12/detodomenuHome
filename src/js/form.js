$(document).ready(function () {
  
  $("form .submit-btn").click(function (e) {
    e.preventDefault();
    var formName = $('#name').val(),
        formEmail = $('#email').val(),
      formSubject = $('#subject').val(),
        formMessage = $("#message").val(),
        formPhone = $("#phone").val(),
        domainUrl = window.location.host,
        theURL = "";

    var newNode = {
      "uid": [{ value: 0 }],
      "contact_form": [{"target_id": "contact"}],
      "name": [{ "value": formName}],
      "mail": [{ "value": formEmail}],
      "subject": [{ "value": formSubject}],
      "message": [{ "value": formMessage}],
      "field_phone": [{ "value": formPhone}]
    }

    function getCsrfToken(callback) {
      jQuery
        .get('/session/token')
        .done(function (data) {
          var csrfToken = data;
          callback(csrfToken);
        });
    }

    function postNode(csrfToken, node) {
      jQuery.ajax({
        url: '/entity/contact_message?_format=json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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