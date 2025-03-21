// const original_answer=['A','B','B','B','B'];
// const form=document.querySelector('form');
// form.addEventListener('submit',(event)=>{

//     event.preventDefault();
//     const data=new FormData('form');
//     const answer=Array.from(data.values());
//     let result=0;
//     for(let i=0;i<answer.length;i++)
//     {
//         if(answer[i]==original_answer[i])
//         {
//             result++;
//         }
//     }
//     console.log(result);
// })



function checkAnswers() {
    let score = 0;
    let totalQuestions = 5;
    
    // Correct answers
    let answers = {
        q1: "C",  // Rohit Sharma
        q2: "B",  // Australia
        q3: "B",  // Muttiah Muralitharan
        q4: "B",  // India
        q5: "B"   // Rahul Dravid
    };

    let unanswered = false;

    // Checking answers
    for (let key in answers) {
        let selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected) {
            if (selected.value === answers[key]) {
                score++;
            }
        } else {
            unanswered = true;
        }
    }

    // Display result
    let resultText = `You scored ${score} out of ${totalQuestions}`;
    if (unanswered) {
        resultText += "\n(You missed some questions!)";
    }
    document.getElementById("result").innerText = resultText;
}