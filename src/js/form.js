$(document).ready(function () {

  var theForm = document.querySelector('.form-custom');
  var theModal = document.getElementById('modal');
  var loader = $('.loader');
  var errorMessage = $('.error-message');

  $('.error-message .close').click(function(){
    $('.error-message').hide();
  });

  theModal.addEventListener('click', e => {

    if (e.target.classList.contains('close-modal')) {
      closeModal();
    }

  })

  function openModal(e) {
    e.preventDefault();
    theModal.classList.remove('is-hidden');
  }

  function closeModal() {
    theModal.classList.add('is-hidden');
  }

  //open modal
  function openModal(e) {
    e.preventDefault();
    theModal.classList.remove('is-hidden');
  }

  $("form .submit-btn").click(function (e) {
    e.preventDefault();
    var formName = $('#name').val(),
      formEmail = $('#email').val(),
      formSubject = $('#subject').val(),
      formMessage = $("#message").val(),
      formPhone = $("#phone").val(),
      domainUrl = window.location.host,
      theURL = "";

    var fields = [
      [document.getElementById("name")],
      [document.getElementById("phone")],
      [document.getElementById("email")],
      [document.getElementById("message")]
    ];

    //validate email
    function emailIsValid(email) {
      return /\S+@\S+\.\S+/.test(email)
    }

    validateForm();

    function validateForm() {

      var error = [];

      for (var i in fields) {
        fields[i][0].style.borderColor = "#393A3D";
        fields[i][0].parentElement.classList.remove('show-error');
        if (fields[i][0].value == "") {
          error.push(fields[i]);
          fields[i][0].style.borderColor = "red";
          fields[i][0].parentElement.classList.add('show-error');
        }
        if (fields[i][0].id == "email") {
          
          if (emailIsValid(formEmail) == false) {
            error.push(fields[i]);
            fields[i][0].style.borderColor = "red";
            fields[i][0].parentElement.classList.add('show-error');
          }

        }
      }

      if (!error.length) {
        postForm();
      }

      return !error.length;
    }

    function postForm() {

      loader.show();

      var newNode = {
        "uid": [{ value: 0 }],
        "contact_form": [{ "target_id": "contact" }],
        "name": [{ "value": formName }],
        "mail": [{ "value": formEmail }],
        "subject": [{ "value": formSubject }],
        "message": [{ "value": formMessage }],
        "field_phone": [{ "value": formPhone }]
      }

      function getCsrfToken(callback) { //https://cors-anywhere.herokuapp.com/
        jQuery
          .get('https://cors-anywhere.herokuapp.com/http://dev-menus-birradev.pantheonsite.io/session/token')
          .done(function (data) {
            var csrfToken = data;
            callback(csrfToken);
          });
      }

      function postNode(csrfToken, node) {
        jQuery.ajax({
          url: 'https://cors-anywhere.herokuapp.com/http://dev-menus-birradev.pantheonsite.io/entity/contact_message?_format=json',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          },
          data: JSON.stringify(node),
          success: function () {
            openModal(e);
            loader.hide();
            document.getElementById("contact-form").reset();
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorMessage.css('display', 'flex');
          } 
        });
      }

      getCsrfToken(function (csrfToken) {
        postNode(csrfToken, newNode);
      });
    }
  });

});