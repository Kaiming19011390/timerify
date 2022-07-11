// test
class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.element = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };

       this.interval = null;
       this.remainingSeconds =0;
   
    


       this.element.control.addEventListener("click",()=> {
        if(this.interval ===null){
            this.start();
        }
        else{
            this.stop();
        }

       });

       
       this.element.reset.addEventListener("click",()=> {
        const inputMinutes = prompt("Enter number of minutes:");

        if(inputMinutes < 61){
         this.stop(); 
         this.remainingSeconds = inputMinutes * 60;
         this.updateInterfaceTime();
        }

       });


       window.addEventListener('load',()=>{
            const form = document.querySelector("#new-task-form");
            const input = document.querySelector("#new-task-input");
            const list_element = document.querySelector("#tasks");

            form.addEventListener('submit', (e) => {
                 e.preventDefault();

                const task = input.value;

                if(!task){
                    alert("You haven't added a task yet!");
                    return;
                }

                const task_element = document.createElement("div");
                task_element.classList.add("task");

                const task_content_element = document.createElement("div");
                task_content_element.classList.add("content");
             


                task_element.appendChild(task_content_element);

                const task_input_element = document.createElement("input");
                task_input_element.classList.add("text");
                task_input_element.type = "text";
                task_input_element.value = task;
                task_input_element.setAttribute("readonly", "readonly");

                task_content_element.appendChild(task_input_element);

                const task_actions_element = document.createElement("div");
                task_actions_element.classList.add("actions");

                const task_edit_element = document.createElement("button");
                task_edit_element.classList.add("edit");
                task_edit_element.innerHTML="Edit";

                const task_delete_element = document.createElement("button");
                task_delete_element.classList.add("delete");
                task_delete_element.innerHTML="Delete";


                task_actions_element.appendChild(task_edit_element);
                task_actions_element.appendChild(task_delete_element);

                task_element.appendChild(task_actions_element);

                list_element.appendChild(task_element);

                input.value = "";

                task_edit_element.addEventListener('click', ()=> {
                if(task_edit_element.innerText.toLowerCase() === "edit") {

                    task_input_element.removeAttribute("readonly");
                    task_input_element.focus();
                    task_edit_element.innerText="save";

                }else{
                   task_input_element.setAttribute("readonly", "readonly");
                   task_edit_element.innerText ="Edit";
                    
                    }

                });


                task_delete_element.addEventListener('click',()=>{
                    list_element.removeChild(task_element);

                });


                })

       })
    }

    updateInterfaceTime(){
        const minutes = Math.floor(this.remainingSeconds /60);
        const seconds = this.remainingSeconds % 60;
        this.element.minutes.textContent = minutes.toString().padStart(2,"0");
        this.element.seconds.textContent = seconds.toString().padStart(2,"0");
    }



    updateInterfaceControls(){
        console.log(this.interval);
        if (this.interval === null){
            this.element.control.innerHTML = ` <span class="material-symbols-outlined">play_arrow</span>`;
            this.element.control.classList.add("timer__btn--start");
            this.element.control.classList.remove("timer__btn--stop");

        }
        else{
            console.log(this.element.control.innerHTML);
            this.element.control.innerHTML = ` <span class="material-symbols-outlined">pause</span>`;
            this.element.control.classList.add("timer__btn--stop");
            this.element.control.classList.remove("timer__btn--start");

        }
    }

    start(){
        if(this.remainingSeconds ===0) return;

        this.interval = setInterval(()=>{
          this.remainingSeconds--;
          this.updateInterfaceTime();

        if(this.remainingSeconds ===0){
            this.stop();
         }
        }, 1000);


        this.updateInterfaceControls();
            

    }

    stop(){
        clearInterval(this.interval);
        
        this.interval=null;

        this.updateInterfaceControls();

    }





    static getHTML() {
        return `
        <center>
        <span class="timer__part timer__part--minutes">00</span>
            <span class="timer__part">:</span>
                    <span class="timer__part timer__part--seconds">00</span>
                        <button type="button" class="timer__btn timer__btn--control  timer__btn--start">
                        <span class="material-symbols-outlined">play_arrow</span>
                        </button>
                <button type="button" class="timer__btn timer__btn--reset">
                <span class="material-symbols-outlined"> timer </span>
        </span>
        </center>
        `

    }

}


new Timer(
    document.querySelector(".timer")
);


