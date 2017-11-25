/**
 * Type some JavaScript here and click either
 * fix or diff.
 */
// Initialize app
var myApp = new Framework7();
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
});

function processBasic(reading, response) {
  var fullName = $$('#' + reading + 'fullName').val();
  var birthDate = $$('#' + reading + 'birthDate').val();
  var goodDate = birthDate.split("-");
  $$.ajax({
    url: 'https://numerology.net/phone.php?code=' + reading + '|' + fullName + '|' + goodDate[1] + '/' + goodDate[2] + '/' + goodDate[0] + '|',
    success: function(e) {
      $$("#" + response).html(e);
    },
    error: function(e) {
      alert(e);
    }
  });
}

function relationship(typeOfReading) {
  var fullNameOne = $$("#fFullName").val();
  var birthDateOne = $$("#fBirthDate").val();
  var fullNameTwo = $$("#sFullName").val();
  var birthDateTwo = $$("#sBirthDate").val();
  var goodDateOne = birthDateOne.split("-");
  var goodDateTwo = birthDateTwo.split("-");
  var url = "https://numerology.net/relphone.php?code=" + typeOfReading + "|" + fullNameOne + "|" + goodDateOne[1] + "/" + goodDateOne[2] + "/" + goodDateOne[0] + "|" + fullNameTwo + "|" + goodDateTwo[1] + "/" + goodDateTwo[2] + "/" + goodDateTwo[0] + "|";
  $$.ajax({
    url: url,
    success: function(e) {
      $$("#relationshipResponse").html(e);
    },
    error: function(e) {
      alert('error');
      alert(url);
    }
  });
}
$$('#submitDestiny').on("click", function(e) {
  processBasic("D", "dResponse");
});
$$('#submitHearts').on('click', function(e) {
  processBasic("H", "hResponse");
});
$$("#submitPersonality").on("click", function(e) {
  processBasic("P", "pResponse");
});
$$('#submitBirthForce').on("click", function(e) {
  processBasic("B", "bResponse");
});
$$('#submitPersonalYear').on("click", function(e) {
  processBasic("Y", "pYResponse");
});
$$("#submitRelationship").on("click", function(e) {
  var radioValue = $$("input[name='type']:checked").val();
  relationship(radioValue);
});

function getGoodDate(date) {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  return month + "/" + day + "/" + year;
}
