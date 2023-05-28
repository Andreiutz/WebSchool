$(document).ready(function(){
  var $selects = $('#select1, #select2').on('dblclick', function() {
  $selects.not(this).append($(this).find(':selected'))
})
});
