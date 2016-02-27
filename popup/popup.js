function parseReminder() {
  reminder = {};
  message = $(".txtMessage").val();
  parsedTime = chrono.parse(message);

  reminder.when = parsedTime[0].ref;
  reminder.whenNatural = parsedTime[0].text;
  reminder.what = message.replace(parsedTime[0].text, ' ');
  return reminder;
}

$( document ).ready(function() {

  $(".txtMessage").on( "keypress", function(event) {
    if (event.which == 13 && !event.shiftKey) {
      console.log("Key pressed");
      event.preventDefault();
      try{
        reminder = parseReminder();
      }
      catch (e) {
        $(".note").hide();
        $(".error").show();
        throw("Not parsed");
      }

      $(".note").hide();
      $(".success").show();
      $(".time").text(reminder.whenNatural);
      $(".message").text(reminder.what);
    }
  });
});
