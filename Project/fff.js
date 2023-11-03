function toggle(){

    let nav=document.querySelector('nav');

    if(nav.style.display!='none'){

        nav.style.display='none'
        nav.style.width='40px'
    }
    else{

        nav.style.display='flex'
        nav.style.width='320px'
    }
}
