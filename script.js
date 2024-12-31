// kurs bittiğinde movienin selectedi her değiştiğinde bilgiler sıfırlanacak.
const container=document.querySelector(".container");
const count=document.getElementById("count");
const amount=document.getElementById("amount");
const select=document.getElementById("movie");
const seats=document.querySelectorAll(".seat:not(.reserved)");
const secilikoltuklar=document.querySelectorAll(".row div");

getFromLocalStroge();
değişim();

container.addEventListener("click",function (e) {
    if(e.target.classList.contains("seat")&& !e.target.classList.contains("reserved"))  //Burda ki contains içermek anlamında (Yani classlistinde istenilen değeri içeriyor mu)
    {
       
        e.target.classList.toggle("selected");      // burda ki (toogle) un (add) den farkı sadece eklemiyor .Tıkladığımızda varsa siliyor yoksa ekliyor.

        değişim();

    }
    
});

select.addEventListener("change",function(e){
    
    

    secilikoltuklar.forEach(function(koltuk)
    {
        koltuk.className='seat';

    })
    değişim();


});

function değişim() {
    const selectedSeats=container.querySelectorAll(".seat.selected");

    const selectedSeatArr=[];
    const seatsArr=[];
    
    selectedSeats.forEach(function(seat){

        selectedSeatArr.push(seat);
    });
    //spread bak!!

    seats.forEach(function(seat){

        seatsArr.push(seat);

    });

    let selectedSeatIndexs=selectedSeatArr.map(function(seat){

        return seatsArr.indexOf(seat);
    });



    let selectedSeatCount=selectedSeats.length;
    
    count.innerText=selectedSeatCount;
    amount.innerText=selectedSeatCount*select.value;; 

    saveTolocalStorage(selectedSeatIndexs);
    // console.log(select)
    
}

    function getFromLocalStroge(){
        const selectedSeats =JSON.parse(localStorage.getItem("selectedSeats"));

            if(selectedSeats !=null && selectedSeats.length>0)
                {
                 seats.forEach(function(seat,index){

                    if(selectedSeats.indexOf(index) > -1)
                        {
                            seat.classList.add("selected");
                        }

                 });
                }


        const selectedMovieIIndex= localStorage.getItem("selectedMovieIIndex");

            if(selectedMovieIIndex !=null)
                {
                select.selectedIndex=selectedMovieIIndex;
                }     

    }

    function saveTolocalStorage(indexs) {
        
        localStorage.setItem("selectedSeats", JSON.stringify(indexs));
        localStorage.setItem("selectedMovieIIndex",select.selectedIndex);
    }


    console.log(secilikoltuklar);