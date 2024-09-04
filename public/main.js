window.addEventListener('load', ()=>{
    const navList = document.getElementById('nav-list');
    const menuButton = document.getElementById('menu-button');

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 640){
            navList.classList.value = 'max-sm:hidden sm:flex sm:flex-auto max-sm:text-center';
        };
    })


    menuButton.addEventListener('click', ()=>{
        if(window.innerWidth > 640){
            return
        }
        else if(navList.classList.contains('max-sm:hidden')){
            navList.classList.remove('max-sm:hidden')
            navList.classList.add('max-sm:block')
        }
        else{
            navList.classList.remove('max-sm:block')
            navList.classList.add('max-sm:hidden')
        }
    });
})

