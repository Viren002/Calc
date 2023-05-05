// import { postfix_conv,finalAnswer } from "./postfix";

window.onload = function () {
  const numbers_btn = document.querySelector("#nums_btn");

  const numbers_btn2 = document.querySelector("#nums_btn2");

  let result_box = document.querySelector(".result_box");

  // var Span = document.createElement('span');
  //    Span.className = "rpleSpan";

  //       Span.style.animation="ripple 400ms ease";

  // span.style.animation = "ripple 400ms linear";

  // elem.appendChild(span);

  // setTimeout(()=>{
  //   span.remove();
  // },4000);

  // event.stopPropagation();

  // }

  numbers_btn.addEventListener("click", (event) => {
    // this is for numbers pad
    var ids = event.target.id;
    var elem = document.getElementById(ids);

    let val = elem.value;

//     const span = document.createElement("span");
    // const btnId = elem.target.id;

//     span.className = "rpleSpan";

    //  span.style.width = "100px";
    //  span.style.height = "100px";

//     span.style.animation = "ripple 400ms linear";

//     elem.appendChild(span);

//     setTimeout(() => {
//       span.remove();
//     }, 4000);

//     result_box.textContent += val;

//     event.stopPropagation();
    
    if (val === "=") {
    
      let resultBox = result_box.textContent;

      let postfixString = Main_Postix(resultBox);

      let final_Ans = Main_Evaluation(postfixString);

      let hstry_box = document.querySelector(".History");

     
      result_box.textContent = final_Ans;

      let div_hstry = document.createElement('div');
      div_hstry.className = 'hstry_div';
      hstry_box.append(div_hstry);

      let para1_hstry = document.createElement('p');
      para1_hstry.append(resultBox)



      let para2_hstry = document.createElement('p');
      para2_hstry.append(final_Ans);

      div_hstry.append(para1_hstry);
      div_hstry.append(para2_hstry);

      // hstry_box.append(resultBox);
      // hstry_box.append(final_Ans);

    }
    else if(val=== "AC"){
      result_box.textContent = "";
    } 
    else{
      result_box.textContent += val;
    }

  


    event.stopPropagation();
 

  });

  
  
//   numbers_btn2.addEventListener("click", (e) => {
//     // this is for Arithmatic Symbols

//     var ids2 = e.target.id;
//     var elem2 = document.getElementById(ids2);

//     /*  setTimeout((elem2)=>{
//             elem2.Style.backgroundColor = "darkgrey";
//       elem2.style.opacity ="0.8";
//      }
//    ,0100);  */

//     let btn_val = e.target.value;

//     if (btn_val === "=") {
    
//       let resultBox = result_box.textContent;

//       let postfixString = Main_Postix(resultBox);

//       let final_Ans = Main_Evaluation(postfixString);

//       result_box.textContent = final_Ans;
//     }
//     else if(btn_val=== "cl"){
//       result_box.textContent = "";
//     } else {
//       result_box.textContent += btn_val;
//     }

//     e.stopPropagation();
//   });

  const hstryBtn = document.querySelector(".hstryBtn");

  hstryBtn.addEventListener("click", (Eh) => {
    // For saving and viewing History

    var hstryBox = document.querySelector(".History");

    if (Eh.target.value === "close") {
      hstryBox.style.transform = "translateX(0px)";

      hstryBox.style.visibility = "visible";
      hstryBox.style.height = "92.4vh";
      hstryBox.style.width = "25vw";

      hstryBox.style.transition = "transform 0.5s ease-out";

      hstryBtn.style.transform = "rotate(-180deg)";

      Eh.target.value = "open";
    } else {
      hstryBox.style.transition = "transform 0.5s ease-out";

      hstryBox.style.transform = "translateX(-300px)";

      hstryBox.style.visibility = "hidden";

      hstryBox.style.height = "0vh";
      hstryBox.style.width = "0vw";

      hstryBtn.style.transform = "rotate(+180deg)";
      Eh.target.value = "close";
    }
  });

  // =================================================
  // =================================================
  // Below codes are for postfix conversion and evaluation

  // import result_box from ('postfix.js');

function Main_Postix(Orgn_str){

  var opStr = "";
  var stck = [];
  
  // var str = result_box;
  var str = Orgn_str;
  
  // var ln = str.length;   // string length
  var Sln = stck.length; // current stck size
  
  console.log("original String = " + str);
  var NewStr = " ";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "+" || str[i] == "-" || str[i] == "*" || str[i] == "/") {
      NewStr += "$";
      NewStr += str[i];
      NewStr += "$";
    } else {
      NewStr += str[i];
    }
  }
  console.log(NewStr + "\n");
  let ln = NewStr.length;
  
  function prc_chck(oprnd) {
    // Checks precedence of operands
    if (oprnd === "/" || oprnd === "*") {
      return 2;
    } else if (oprnd === "+" || oprnd === "-") {
      return 1;
    } else {
      return 0;
    }
  }
  
  function postfix_conv(NewStr, ln) {
    for (let i = 0; i < ln; i++) {
      if (
        (NewStr[i] >= "0" && NewStr <= "9") ||
        (NewStr[i] >= "a" && NewStr <= "b") ||
        (NewStr[i] >= "A" && NewStr <= "B")
      ) {
        // stck.push(NewStr[i]);
        opStr += NewStr[i];
      }
       else if (NewStr[i] === "$") {
        // stck.push(NewStr[i]);
        opStr += NewStr[i];
      }
       else if (NewStr[i] === "(") {
        stck.push(NewStr[i]);
      } 
      else if (NewStr[i] === ")") {
        while (stck[stck.length - 1] != "(" && stck.length > 0) {
        
            opStr += stck.pop();
  
           
        }
        stck.pop();
        // let isPrnths = stck.pop(); // This pop will remove "(" bracket.
        // console.log("isPrnths = " + isPrnths);
  
       
      } else {
        if (prc_chck(NewStr[i]) > prc_chck(stck[stck.length - 1])) {
          stck.push(NewStr[i]); // pushes into stck,if scanned operator has higher precedence
        } 
        else if (
          stck[stck.length - 1] === "\0" ||
          stck[stck.length - 1] === "("
        ) {
          stck.push(NewStr[i]);
        }
         else if (prc_chck(NewStr[i]) === prc_chck(stck[stck.length - 1])) {
          let chtop = stck.pop();
          stck.push(NewStr[i]);
  
          // stck.push(chtop);
  
          opStr += chtop;
        
        } 
       
        else {
          while (prc_chck(stck[stck.length - 1]) > prc_chck(NewStr[i])) {
            //  let topCh = stck.pop();
            let topCh = stck[stck.length - 1];
  
            opStr += topCh;
  
            stck.pop();
          }
          //  stck.pop();
          stck.push(NewStr[i]);
        }
      }
    } // for loop ends here .
  
    let Sln = stck.length;
    console.log("Sln = " + Sln, "stck[Sln] = " + stck[Sln]);
    while (Sln > 0) {
      let chTop = stck.pop();
      opStr += chTop;
  
      Sln = stck.length;
      Sln--;
  
     
    }
  
    return opStr;
  } // Postfix convert function ends here .
  

  let postfix_str =   postfix_conv(NewStr,ln);
     return postfix_str; 
  } /// Main_Postfix function ends here .
  
  // let postfixString = postfix_conv(NewStr, ln);
  console.log("Postfix String = ");
  // console.log(postfixString);
  
  // From below , codes are for evaluating
  
  function Main_Evaluation(PostfixString){
  
  var ans = 0;
  var resultStck = [];
  var first,
    scnd,
    Ans = 0; // first and scnd are real order of both nums in actual string.
  
  function Do_Operation(first, scnd, Oprtr) {
    // This function does calculation based on operator
    if (Oprtr === "%") {
      ans = (first * scnd) / 100;
    } else if (Oprtr === "/") {
      ans = first / scnd;
    } else if (Oprtr === "*") {
      ans = first * scnd;
    } else if (Oprtr === "+") {
      ans = first + scnd;
    } else if (Oprtr === "-") {
      ans = first - scnd;
    }
    // else{
    //     console.log("Operation not available !");
    //     // "Operation not available !";
    // }
  
    return ans;
  }
  
  function Eval_Postfix(postfixString) {
    let num = 0;
    let chr;
    for (let i = 0; i < postfixString.length; i++) {
      // chr = postfixString[i];
  
      if (postfixString.length === 0) {
        console.log("No input found!");
      } 
      else if (postfixString[i] === "$") {
        
        continue;
      }
       else if (postfixString[i] >= "0" && postfixString[i] <= "9") {
    
          chr = postfixString[i];
          num = 0;
          while ((chr >= "0" && chr <= "9")) {
       
              num = num * 10 + (chr - "0");
              i++;
  
              chr = postfixString[i];
          }
            i--;
        //  console.log(num+'\n');
        resultStck.push(num);
        //  num = 0;
      }
       else {
       
        scnd = resultStck.pop();
        //  console.log('scnd = '+scnd+'\n');
        first = resultStck.pop();
        //  console.log('first = '+first+'\n');
  
        Ans = Do_Operation(first, scnd, postfixString[i]);
        //  console.log(Ans);
        resultStck.push(Ans);
      }
    } //for loop ends here.
  
    let rslt_stckTop = resultStck.pop();
    // return resultStck.pop();
    return rslt_stckTop;
    
  } // Function ends here .
  
      return Eval_Postfix(PostfixString) //
  }  // Main_Evaluation function ends here .
  
  
  console.log("Result Stck = \n");
  // for(let i=0;i<resultStck.length;i++){
  // console.log(resultStck);
  // }
  
  // let finalAnswer = Eval_Postfix(postfixString);
  // console.log("Ans = " + finalAnswer);
  
  
  // export {postfix_conv,finalAnswer};

};
// */
const chr = "{";

if (`${chr}` > "/")
 {
  console.log(`${chr} higher has precedence !`);
}
 else if (`${chr}` === "/")
  {
  console.log(`${chr} has equal precedence !`);
} 
else {
  console.log(`${chr} has lower precedence !`);
}
