
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
        arrowParent.classList.toggle("showMenu");
      });
    }





    let sidebar = document.querySelector(".sidebar",);
    let sidebarBtn = document.querySelector(".bx-menu");
    console.log(sidebarBtn);
 






    $(function () {
      resizeScreen();
      $(window).resize(function(){
        resizeScreen();
      });






      $('.bx-menu').click(function(){

        
        if(document.body.clientWidth > 400){
          $('.sidebar').toggleClass('close');
        }else{
          $('.sidebar').toggleClass('small-screen');
        }
      });








      
      function resizeScreen() {
        
        if(document.body.clientWidth < 400){
          $('.sidebar').addClass('close');
        }else{
          $('.sidebar').removeClass('close');
        }
      }
    });





  


  let products = []
const productsSection = document.getElementById('products')