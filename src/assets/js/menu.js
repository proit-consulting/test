/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
//$(document).ready()
window.addEventListener("load", function() {
    var bodyEl = document.body;
    var mover = document.getElementById("open-button");
    var menu = document.getElementById("header-wrap");
    var content = document.querySelector('.content-wrap');
    var painel = document.getElementById("collapseExample");
    var closebtn = document.getElementById('close-button');

    var isOpen = false;
    // if (menu != null) {
    mover.addEventListener("click", toggleMenu);

    // }
    /* else {
            var bodyEl = document.body;
            var mover = document.getElementById("open-button");
            var menu = document.getElementById("header-wrap");
            var content = document.querySelector('.content-wrap');
            var painel = document.getElementById("collapseExample");
            var closebtn = document.getElementById('close-button');
            var isOpen = false;
        }*/

    if (closebtn) {
        closebtn.addEventListener('click', toggleMenu);

    }

    function toggleMenu() {

        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
        } else {
            classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
    }

});

/*(function() {

    var bodyEl = document.body,
        content = document.querySelector('.content-wrap'),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {

        //document.getElementById("open-button").addEventListener("click", function() { console.log("Hi"); });
        openbtn.addEventListener('click', toggleMenu);
        if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
        }
    }

    function toggleMenu() {
        if (isOpen) {
            classie.remove(bodyEl, 'show-menu');
        } else {
            classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
    }

    init();

})();*/