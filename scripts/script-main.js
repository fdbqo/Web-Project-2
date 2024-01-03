
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('mouseover', function() {
//         if (this.tagName.toLowerCase() === 'button') {
//             for (var j = 0; j < buttons.length; j++) {
//                 if (buttons[j] !== this) {
//                     buttons[j].classList.add('blur');
//                 }
//             }
//         }
//     });

//     buttons[i].addEventListener('mouseout', function() {
//         if (this.tagName.toLowerCase() === 'button') {
//             for (var j = 0; j < buttons.length; j++) {
//                 buttons[j].classList.remove('blur');
//             }
//         }
//     });
// }


// const filterButton = document.querySelector('.btn-filter');
// const filterSorter = document.querySelector('#filterSorter');

// filterSorter.addEventListener('show.bs.offcanvas', () => {
//     filterButton.style.opacity = '0';
//     setTimeout(() => { filterButton.style.visibility = 'hidden'; }, 500);
// });

// filterSorter.addEventListener('hidden.bs.offcanvas', () => {
//     filterButton.style.visibility = 'visible';
//     setTimeout(() => { filterButton.style.opacity = '1'; }, 1);
// });