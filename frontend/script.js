console.log("JavaScript Loaded");

const darkModeBtn = document.getElementById("darkModeBtn");
const button = document.getElementById("askBtn");
const input = document.getElementById("queryInput");

const sqlOutput = document.getElementById("sqlOutput");
const resultDiv = document.getElementById("result");
const loading = document.getElementById("loading");
const copyBtn = document.getElementById("copyBtn");
const recordCount = document.getElementById("recordCount");
const clearBtn = document.getElementById("clearBtn");
const historyDiv = document.getElementById("history");
const downloadBtn = document.getElementById("downloadBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const executionTime = document.getElementById("executionTime");
const toast = document.getElementById("toast");

const exampleButtons = document.querySelectorAll(".example-btn");


let queryHistory = [];
let currentResults = [];


button.addEventListener("click", askAI);


// Enter key support
input.addEventListener("keypress", function(event) {

    if(event.key === "Enter"){
        askAI();
    }

});



async function askAI(){

    let question = input.value.trim();


    if(question === ""){

        showToast("⚠️ Please enter a question.");
        return;

    }


    loading.style.display = "block";


    let messages = [

        "🤖 AI is thinking...",
        "🔍 Understanding your question...",
        "⚙️ Generating SQL...",
        "🗄️ Fetching database results..."

    ];


    let index = 0;


    loading.innerHTML = messages[index];


    let loadingInterval = setInterval(()=>{


        index = (index + 1) % messages.length;

        loading.innerHTML = messages[index];


    },800);



    resultDiv.innerHTML = "";


    try{


       const response = await fetch(
    "http://127.0.0.1:8000/query",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    question:question

                })

            }
        );



        if(!response.ok){

            throw new Error(
                "API Error : " + response.status
            );

        }



        const data = await response.json();



        loading.style.display="none";

        clearInterval(loadingInterval);



        // SQL safety error

        if(data.error){

    loading.style.display = "none";
    clearInterval(loadingInterval);

    sqlOutput.textContent = data.sql;

    executionTime.innerHTML = "";

    recordCount.innerHTML = "";

    currentResults = [];

    resultDiv.innerHTML =
    `<p class="error">${data.error}</p>`;

    return;

}



        // Save history

        queryHistory.push({

            question:question,

            sql:data.sql

        });


        updateHistory();




        // Show SQL

        sqlOutput.textContent = data.sql;



        // Show execution time

        executionTime.innerHTML =
        `⚡ Execution Time: ${data.execution_time} seconds`;




        currentResults = data.result;




        // No data

        if(!data.result || data.result.length===0){


            recordCount.innerHTML =
            "<strong>Total Records:</strong> 0";


            resultDiv.innerHTML =
            "<p>No records found.</p>";


            return;


        }





        // Create table

        let table="<table>";



        table+="<tr>";



        Object.keys(data.result[0]).forEach(key=>{


            table += `<th>${key}</th>`;


        });


        table+="</tr>";




        data.result.forEach(row=>{


            table+="<tr>";



            Object.values(row).forEach(value=>{


                table += `<td>${value}</td>`;


            });



            table+="</tr>";



        });



        table+="</table>";



        recordCount.innerHTML =
        `<strong>Total Records:</strong> ${data.result.length}`;



        resultDiv.innerHTML = table;



    }


    catch(error){



        loading.style.display="none";


        clearInterval(loadingInterval);



        console.error(error);



        sqlOutput.textContent="Error";



        resultDiv.innerHTML =
        `<p class="error">${error.message}</p>`;


    }


}






// Copy SQL

copyBtn.addEventListener("click",()=>{

    navigator.clipboard.writeText(sqlOutput.textContent);

    showToast("✅ SQL copied successfully");

    copyBtn.innerHTML="✅ Copied";

    setTimeout(()=>{

        copyBtn.innerHTML="📋 Copy SQL";

    },2000);

});






// Clear button

clearBtn.addEventListener("click",()=>{


    input.value="";


    sqlOutput.textContent =
    "Waiting for query...";


    executionTime.innerHTML="";


    recordCount.innerHTML="";


    resultDiv.innerHTML =
    "Waiting for result...";


});








// Update history

function updateHistory(){


    let html="";


    queryHistory.forEach((item,index)=>{


        html += `

        <div class="history-item">

        <p>
        <b>${index+1}. Question:</b>
        ${item.question}
        </p>


        <p>
        <b>SQL:</b>
        ${item.sql}
        </p>


        </div>

        `;


    });



    historyDiv.innerHTML = html;


}









// Download CSV

downloadBtn.addEventListener("click",()=>{


    if(currentResults.length===0){


       showToast("❌ No data available to download.");

        return;

    }



    let csv="";



    let headers =
    Object.keys(currentResults[0]);



    csv += headers.join(",") + "\n";



    currentResults.forEach(row=>{


        let values =
        headers.map(header=>row[header]);



        csv += values.join(",") + "\n";


    });



    let blob =
    new Blob([csv],{type:"text/csv"});



    let url =
    window.URL.createObjectURL(blob);



    let a=document.createElement("a");



    a.href=url;


    a.download="query_result.csv";


   a.click();

showToast("📥 CSV downloaded successfully");

window.URL.revokeObjectURL(url);



});









// Clear History

clearHistoryBtn.addEventListener("click",()=>{


    queryHistory=[];


    historyDiv.innerHTML =
    "No queries yet...";


});








// Dark Mode

darkModeBtn.addEventListener("click",()=>{


    document.body.classList.toggle(
        "dark-mode"
    );



    if(document.body.classList.contains("dark-mode")){


        darkModeBtn.innerHTML =
        "☀️ Light Mode";


    }
    else{


        darkModeBtn.innerHTML =
        "🌙 Dark Mode";


    }


});








// Example buttons

exampleButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        input.value =
        button.innerText.substring(2);


    });


});
function showToast(message) {

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}
