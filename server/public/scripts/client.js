console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let newKoala = {
      name:$('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      ready_to_transfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( newKoala );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas',
  })
    .done (function( response ){
      console.log( 'got some koalas: ', response );
      exposeKoalas(response);
    })// end done
    .fail (function( data ){
      console.log( 'WOMP, cant gettem');
    })
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas/add',
    data: newKoala,
  })
    .done (function( response ){
      console.log( 'posted some koalas: ', response );
      getKoalas();
    })// end done
    .fail (function(){
      console.log( 'WOMP, cant gettem');
    }) //end fail
}//end saveKoala

function exposeKoalas(koalas){
  $('#viewKoalas').empty();
  for(let koala of koalas){
    $('#viewKoalas').append(`<div> ${koala.name}, ${koala.sex}, ${koala.age}, ${koala.ready_to_transfer}, ${koala.notes} </div> `)
  }
}
