
//$(function(){

    // make a copy of .component
    // add the copy to the DOM
    // position the copy at the mouse
    // make the copy draggable
    // start dragging copy
    // drag the copy


//TODO:
    // change '.component' to be '.original' in the dom, as well as the js (body on mousedown function); Justification: to clarify that that function is saying when you are choosing the component from the available components list (library-wrapper), you will be creating a copy (well for now just an entirely new element that is defined in the css sheet) of it immediately and the elements that exist in library wrapper are the originals

    // create Component class: for when generated, what do they look like


// will reference the object of the thing being dragged when making a clone
// and allow us to drag it and drop it. Once dropped, dragThing will be
// set back to null

// ----------------------------------------------
// Helper utilities (eventually move to helpers.js)

function get_one_element(name){
  return document.querySelector(name)
}

// ----------------------------------------------
// Component Class Definition (eventually move to component.js)

(function(){
  //instert class definition, prototypes, and functional script
  function Component(component_name, ref_to_def){
    this.component_name = component_name || 'resistor'
    this.rot = 0
    this.el = ref_to_def.cloneNode(true)
    this.el.style.position = 'absolute'
    this.el.setAttribute('id', "clone_" + cloneNum)
    this.el.setAttribute('draggable', 'true')
    this.el.setAttribute('ondragstart', 'drag(event)')
  }

  // methods
  Component.prototype.destroy = function(){
    // remove this element from the dom
    this.el.remove()
    // TODO: remove from the list as well. Should this be here?
  }

  Component.prototype.update = function(){
    this.el.style.transform = `rotate(${this.rot})`
  }

  Component.prototype.rotate = function(){
    this.rot += 90 % 360
    this.update()
  }

  // Component.prototype.

  // make it public and return a new instance
  window.Component = function(component_name, ref_to_def){
    return new Component(component_name, ref_to_def)
  }
}());

// ------------------------------
// Dragging Class definition (dragging.js ?)

let dragThing = null
let cloneNum = 0


/*
    ======= CREATE & DRAG A NEW THING
            FROM OG COMPONENTS
            in #library-wrapper =======
*/

get_one_element('.component').onmousedown = function(ev){
  const thing = Component('resistor', get_one_element('#resistor'))
  cloneNum += 1
  console.log('thing: ',thing)
  get_one_element('#svg-container').appendChild(thing.el)
  dragThing = thing

}

// $('body').on('mousedown','.component', function(ev){
//     // const pos = $(this).position()
//     // console.log(pos)
//     // const thing = document.createElement('div')
//     const thing = Component('resistor', get_one_element('#resistor'))
//     cloneNum += 1
//     console.log('thing: ',thing)
//     // $('#main-wrapper').append(thing)
//     // $(thing).addClass('copy')
//     // $(thing).attr({id: "clone_" + cloneNum, draggable: "true", ondragstart: "drag(event)"})
//     // dragThing = thing
//     get_one_element('#svg-container').appendChild(thing)
//     dragThing = thing
//
// })

//$('#grid-wrapper').on('mousedown','.copy', function(ev){
//    const object_dragging = $(this)
//    console.log(object_dragging)
//})




let drag_king = function(ev) {

    if(dragThing === null){
        return
    }

    const x = ev.pageX;
    const y = ev.pageY;

    dragThing.el.style.setProperty('--x', x)
    dragThing.el.style.setProperty('--y', y)
}

window.onmousemove = drag_king;

window.onmouseup = function(ev) {
    dragThing = null
}



    function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {


 // make sure you allow theitem to be draggable
 // and attach this function to the object in the html
    ev.dataTransfer.setData("text", ev.target.id);
    console.log('ev.target.id: ', ev.target.id)
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    var component_id = document.getElementById(data)
    if (component_id !== null) {
  // Now we know that component_id not null, we are good to go.
  // aka: if we are dragging from the original, the id is
  // not set yet, and we want to make sure we only
    component_id.style.setProperty('--x', ev.pageX)
    component_id.style.setProperty('--y', ev.pageY)
}

//    ev.target.appendChild(document.getElementById(data));

}





//  $( ".component" ).draggable({
//      revert: "invalid",
//    drag: function(event, ui){
//    if(event.pageX>=240 && event.pageY>32){
//      $(this).draggable({grid:[16,16]})
//    }
//  }
//  });
//      $( "#grid-wrapper" ).droppable({
//
//      drop: function( event, ui ) {
//        // $( this )
//        //   .addClass( "ui-state-highlight" )
//        //   .find( "p" )
//        //     .html( "Dropped!" );
//      }
//    });


//})
