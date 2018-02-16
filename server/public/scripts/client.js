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
  $('#viewKoalas').on('click', '.deleteButton', function(){
    console.log('Ex-Term-In-Nate');
    let deleteKoala = $(this).data('id');
    terminateKoala(deleteKoala);
  })
  $('#viewKoalas').on('click', '.transferButton', function(){
    console.log('Beam me up scotty');
    let soberKoala = $(this).data('id');
    transferKoala(soberKoala);
  })
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
      console.log( 'WOMP, cant postem');
    }) //end fail
}//end saveKoala

function exposeKoalas(koalas){
  $('#viewKoalas').empty();
  for(let koala of koalas){
    if (koala.ready_to_transfer == 'N'){
      $('#viewKoalas').append(`<tr><td> ${koala.name}</td><td> ${koala.sex}</td><td> ${koala.age}</td><td> ${koala.ready_to_transfer}<button class="transferButton" data-id=${koala.id}>Ready</button> </td><td> ${koala.notes} </td>
      <td><button class="deleteButton" data-id=${koala.id}>Murder</button> </td></tr> `)
    }
    else {

    $('#viewKoalas').append(`<tr><td> ${koala.name}</td><td> ${koala.sex}</td><td> ${koala.age}</td><td> ${koala.ready_to_transfer}</td><td> ${koala.notes} </td>
    <td><button class="deleteButton" data-id=${koala.id}>Murder</button> </td></tr> `)}
  }
}

function terminateKoala(id){
  $.ajax ({
    type : 'DELETE',
    url :`/koalas/delete/${id}`,
  })
  .done (function( response ){
    console.log( 'Koala has been poached', response );
    getKoalas();
  })// end done
  .fail (function(){
    console.log( 'Koala survived');
  }) //end fail
}

function transferKoala(id){
  $.ajax ({
    type: 'put',
    url: `/koalas/transfer/${id}`
  })
    .done (function( response ){
      console.log( 'rehabed Koala ', response );
      getKoalas();
    })// end done
    .fail (function(){
      console.log( 'relasped koala');
  })
}
