/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});


let backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];
let borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]


if (document.getElementById('academic') && document.getElementById('personal')) {


    var academic = document.getElementById('academic').getContext('2d');
    var personal = document.getElementById('personal').getContext('2d');
    var lecturer = document.querySelector('#charts .lecturer-id');
    var votesAcademic = document.querySelector('#charts .academic').dataset.voters;
    var votesPersonal = document.querySelector('#charts .personal').dataset.voters;
    console.log(votesAcademic, votesPersonal);
    axios({
        method: 'get',
        url: "/lecturer/statistics/" + lecturer.dataset.lecturer
    }).then(resp => {

        let data = resp.data;
        var academicChart = new Chart(academic, {
            type: 'radar',
            data: {
                labels: [
                    'კარგი დიქცია',
                    'ახსნის უნარი',
                    'დაინტერესებულეობა სტუდენტით',
                    'დავალებების სიმარტივე',
                    'დავალებების სიმრავლე',
                    'კომუნიკაცია'
                ],
                datasets: [{
                    label: `${votesAcademic} Votes`,
                    data: Object.values(data.academic),
                    backgroundColor,
                    borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


        var personalChart = new Chart(personal, {
            type: 'radar',
            data: {
                labels: [
                    'ქულებს კარგად წერს',
                    'მომწონს',
                    'ტაქტიანია',
                    'ორგანიზებულია',
                    'გამგებია',
                    'საყვარელია',
                ],
                datasets: [{
                    label: `${votesPersonal} Votes`,
                    data: Object.values(data.personal),
                    backgroundColor,
                    borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
}


