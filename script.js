window.addEventListener('DOMContentLoaded', function(){
    //загружается после загрузки дом-дерева

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll ('.info-tabcontent');

    function hideTabContent(a){
        for( let i = a; i<tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //TIMER

    let deadline = '2021-03-15';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/3600) % 24),
            days = Math.floor((t/1000/3600/24));

            return{
                'total' : t,
                'days' : days,
                'hours' : hours,
                "minutes" : minutes,
                'seconds' : seconds
            };
    }

    function setClock (id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock (){
            let t = getTimeRemaining(endtime);

            function addZero(num){////////////////
                if(num <= 9) {
                    return '0' + num;
                } else {return num;}
            }

                days.textContent = addZero(t.days);
                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);


            if (t.total <= 0){
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    setClock ('timer', deadline);

    // Modals window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        descBTN = document.querySelector('.description-btn'),
        close = document.querySelector('.popup-close');

    more.addEventListener("click", function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; //запрещает прокрутку страницы
    });

    descBTN.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';

    });


    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });



    //Form

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'

    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4 ){
                statusMessage.innerHTML = message.loading;
            }
            else if (request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++){
            input[i].value='';
        }
    });

    //slider

    let slidIndex = 1, // параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slidIndex);
        function showSlides(n){

            if (n > slides.length){
                slidIndex = 1;
            }
            if (n < 1){
                slidIndex = slides.length;
            }

            slides.forEach((item)=>item.style.display = 'none');
            //for (let i = 0; i < slides.length; i++){    // одно и тоже
            //    slides[i].style.display = 'none';
            //}
            dots.forEach((item)=> item.classList.remove('dot-active'));

            slides[slidIndex - 1].style.display = 'block';
            dots[slidIndex - 1].classList.add('dot-active');
        }

        function plusSlides (n){
            showSlides(slidIndex += n);
        }
        function cerrentSlide(n){
            showSlides(slidIndex = n);
        }

        prev.addEventListener('click', function(){
            plusSlides(-1);
        });
        next.addEventListener('click', function(){
            plusSlides(1);
        });
        dotsWrap.addEventListener('click', function(event){
            for(let i = 0; i < dots.length + 1; i++){
                if( event.target.classList.contains('dot') && event.target == dots[i - 1]){
                    cerrentSlide(i);
                }
            }
        });


        //calc

        let persons = document.querySelectorAll('.counter-block-input')[0],
            restDays = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personsSum = 0,
            daysSum = 0,
            total = 0;

            totalValue.innerHTML = 0;

            persons.addEventListener('change', function(){
                personsSum = +this.value;
                total = (daysSum * personsSum)*4530;

                if (restDays.value == ''){
                    totalValue.innerHTML = 0;
                } else{
                    totalValue.innerHTML = total;
                }
            });

            restDays.addEventListener('change', function(){
                daysSum = +this.value;
                total = (daysSum * personsSum)*4530;

                if (persons.value == ''){
                    totalValue.innerHTML = 0;
                } else{
                    totalValue.innerHTML = total;
                }
            });

            place.addEventListener('change',function(){
                if(restDays.value == '' || persons.value == ''){
                    totalValue.innerHTML = 0;
                }else{
                    let a = total;
                    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
                }
            });




});




